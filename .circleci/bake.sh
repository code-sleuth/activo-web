#!/bin/bash

set -ex
set -o pipefail

echo "building the packer image"
declare_env_variables() {
  DEPLOYMENT_ENVIRONMENT="staging"
  PACKER_IMG_TAG=""
  if [ "$CIRCLE_BRANCH" == 'master' ]; then
    DEPLOYMENT_ENVIRONMENT="production"
    RESERVED_IP=${PRODUCTION_RESERVED_IP}
  fi

  if [[ "$CIRCLE_BRANCH" =~ 'sandbox' ]]; then
    DEPLOYMENT_ENVIRONMENT="sandbox"
    RESERVED_IP=${SANDBOX_RESERVED_IP}
  fi
}

generate_service_account() {
    touch /home/circleci/activo-infra/shared/account.json
    echo ${SERVICE_ACCOUNT} > /home/circleci/activo-infra/shared/account.json
}

build_packer_image() {
    echo "Rebuilding the packer image"

    pushd /home/circleci/activo-infra/packer/web
        touch packer_output.log
        RAILS_ENV="$DEPLOYMENT_ENVIRONMENT" VOF_PATH="/home/circleci/vof" PROJECT_ID="$GCLOUD_VOF_PROJECT" packer build packer.json 2>&1 | tee packer_output.log
        PACKER_IMG_TAG="$(grep 'A disk image was created:' packer_output.log | cut -d' ' -f8)"
    popd
    mkdir -p workspace
    echo $PACKER_IMG_TAG > ~/vof/workspace/output
    cat ~/vof/workspace/output

}

check_out_infrastructure_code() {
    echo "Checkout the infrastructure code"

    mkdir -p /home/circleci/vof-repo

    if [ "$CIRCLE_BRANCH" == "master" ]; then
      git clone -b master ${VOF_INFRASTRUCTURE_REPO} /home/circleci/vof-repo
    else
      git clone -b develop ${VOF_INFRASTRUCTURE_REPO} /home/circleci/vof-repo
    fi
}
main (){
    declare_env_variables
    check_out_infrastructure_code
    generate_service_account
    build_packer_image
}
main "@$"
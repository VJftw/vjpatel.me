from invoke import task
from docker import APIClient
import os
from invoke_tools import lxc, system, vcs


cli = APIClient(base_url='unix://var/run/docker.sock', timeout=600)

system.Info.print_all()

repo = vcs.Git()
repo.print_all()


@task
def build(ctx):
    """
    Builds static website
    """

    lxc.Docker.build(cli,
        dockerfile='Dockerfile',
        tag="{0}-dev".format("vjpatel-hugo")
    )

    lxc.Docker.run(cli,
        tag="{0}-dev".format("vjpatel-hugo"),
        command='hugo',
        volumes=[
            "{0}/vjpatel:/app".format(os.getcwd())
        ],
        working_dir="/app",
        environment={}
    )


@task
def deploy(ctx):
    """
    Deploys static website
    """

    print("Downloading AWS CLI")
    for line in cli.pull('garland/aws-cli-docker:latest', stream=True):
        pass

    lxc.Docker.run(cli,
        tag="garland/aws-cli-docker:latest",
        command='aws s3 cp public/. s3://vjpatel.me --recursive --cache-control max-age=120',
        volumes=[
            "{0}/vjpatel:/app".format(os.getcwd())
        ],
        working_dir="/app",
        environment={
            "AWS_ACCESS_KEY_ID": os.getenv("AWS_ACCESS_KEY_ID"),
            "AWS_SECRET_ACCESS_KEY": os.getenv("AWS_SECRET_ACCESS_KEY"),
            "AWS_DEFAULT_REGION": "eu-west-1"
        }
    )

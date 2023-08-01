import subprocess
import os
from datetime import datetime
from shutil import make_archive

from fabric import task, Connection

@task
def hello(_):
    log("hello world")

def log(cmd):
    print(f"[{datetime.now()}]: {cmd}")


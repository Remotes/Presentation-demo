from fabric.api import *
import os

DROPBOX_DESTINATION_FOLDER = "~/Dropbox/Public/www/"


def deploy():
	exclude_list = [".git", ".gitignore", "fabfile.py", "fabfile.pyc", ".DS_Store"] 
	exclude_string = "--exclude '%s'" % "' --exclude '".join(exclude_list)
	
	print "Deploying to %s" % DROPBOX_DESTINATION_FOLDER


	local("rsync -av %s %s %s" % (exclude_string, os.getcwd(), DROPBOX_DESTINATION_FOLDER))
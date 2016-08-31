VAGRANT_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.provision "shell",
		inline: "echo 'Hello WOrld!!!' && sudo apt-get -y install emacs "
end

require "vegas"
require "grit"
require "git-bubble/server"

module GitBubble
    class App
        def self.watch_repo(repo_path)
            begin
                repo = Grit::Repo.new(repo_path)
            rescue
                puts "ERROR: current directory is not a valid git repo."
            else
                Vegas::Runner.new(Server, 'git-bubble', { :repo => repo })
            end
        end
    end
end


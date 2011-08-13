require "vegas"
require "git-bubble/server"

module GitBubble
    class App
        def self.watch_repo(repo_path)
            Vegas::Runner.new(Server, 'git-bubble')
        end
    end
end


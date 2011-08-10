require "launchy"
require "git-bubble/server"

module GitBubble
    class App
        def self.watch_repo(repo_path)
            server_thread = Thread.new { Server.run! }
            sleep(1)
            Launchy.open("http://0.0.0.0:4567/")
            server_thread.join
        end
    end
end


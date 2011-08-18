require "sinatra/base"
require "haml"
require "json"

module GitBubble
    class Server < Sinatra::Base
        base_dir = File.dirname(File.expand_path(File.join(__FILE__, '..', '..')))

        set :views,  "#{base_dir}/views"
        set :public, "#{base_dir}/public"
        set :static, true

        set :haml, :format => :html5

        get "/" do
            haml :index
        end

        get "/commits" do
            commits = settings.repo.commits(max_count = false).reduce({}) {|hash, commit| add_to hash, commit }
            commits.to_json
        end

        def add_to(hash, commit)
            hash[commit.sha] = {
                :date => commit.date.strftime('%Y/%m/%d %T %z'),
                :author => commit.author,
                :ratio => 0,
                :size => commit.stats.additions,
            }
            hash
        end
    end
end


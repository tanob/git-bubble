require "sinatra/base"
require "haml"

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
    end
end


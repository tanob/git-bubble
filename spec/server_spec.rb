require 'git-bubble'
require 'rack/test'

describe GitBubble::Server do
    include Rack::Test::Methods

    before(:each) do
        @repo = double()
        GitBubble::Server.set :environment, :test
        GitBubble::Server.set :repo, @repo
    end

    def app
        GitBubble::Server
    end

    it 'should return last commits from repo' do
        @repo.should_receive(:commits).with(max_count = false).and_return(last_commits)
        get '/commits'
        JSON.parse(last_response.body).should == JSON.parse(info_from(last_commits).to_json)
    end

    def last_commits
        [ commit('first_sha1', 'author 1', Time.new(2011,11,2,13,25,0, "-03:00"), 'first commit', 8),
          commit('second_sha1', 'author 2', Time.new(2011,11,1,14,0,0, "-05:00"), 'second commit', 71),
        ]
    end

    def commit(sha1, author, commited_date, message, lines_added)
        commit = Grit::Commit.new(@repo, sha1, [], nil, author, 'authored date', 'commiter', commited_date, [message])
        commit.stub_chain(:stats, :additions).and_return(lines_added)
        commit
    end

    def info_from(commits)
        commits.reduce({}) do |hash, commit|
            hash[commit.sha] = {
                :date => commit.date.strftime('%Y/%m/%d %T %z'),
                :ratio => 0,
                :size => commit.stats.additions,
                :author => commit.author
            }
            hash
        end
    end
end


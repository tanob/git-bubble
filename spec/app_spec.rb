require 'git-bubble'

describe GitBubble::App do
    describe '#watch_repo' do
        it 'should show an error if current directory is not a git repo' do
            Grit::Repo.stub(:new).with('not git repo') { raise Grit::InvalidGitRepositoryError }
            $stdout.should_receive(:puts).with('ERROR: current directory is not a valid git repo.')
            GitBubble::App.watch_repo('not git repo')
        end

        it 'should open the browser after the server started' do
            repo = double()
            Grit::Repo.should_receive(:new).with('valid repo').and_return(repo)
            Vegas::Runner.should_receive(:new).with(GitBubble::Server, 'git-bubble', { :repo => repo })
            GitBubble::App.watch_repo('valid repo')
        end
    end
end


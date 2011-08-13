require 'git-bubble'

describe GitBubble::App do
    describe '#watch_repo' do
        it 'should open the browser after the server started' do
            Vegas::Runner.should_receive(:new).with(GitBubble::Server, 'git-bubble')
            GitBubble::App.watch_repo(nil)
        end
    end
end


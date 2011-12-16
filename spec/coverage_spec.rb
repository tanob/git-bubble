require 'git-bubble'

describe GitBubble::Coverage do
  it "should calculate ratio of test coverage for a commit" do
    commit = commit_with([
      ["lib/git-bubble/server.rb", 16, 0, 16],
      ["spec/server_spec.rb", 47, 0, 47],
    ])

    ratio = GitBubble::Coverage.ratio_for(commit)
    ratio.should == 16/47.0
  end

  it "should return zero for untested commits" do
    commit = commit_with([
      ["public/git-bubble.js", 16, 0, 16],
      ["views/template.html", 47, 0, 47],
    ])

    ratio = GitBubble::Coverage.ratio_for(commit)
    ratio.should == 0
  end

  it "should only consider ruby files as production code" do
    commit = commit_with([
      ["lib/git-bubble.rb", 3, 1, 4],
      ["views/template.html", 47, 0, 47],
      ["spec/git-bubble_spec.rb", 10, 0, 10]
    ])

    ratio = GitBubble::Coverage.ratio_for(commit)
    ratio.should == 3.0/10
  end

  def commit_with(files)
    commit_stats = Grit::CommitStats.new(mock(:repo), "commit id", files)
    commit = mock(Grit::Commit)
    commit.stub_chain(:stats).and_return(commit_stats)
    commit
  end
end


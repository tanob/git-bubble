module GitBubble
  class Coverage
    def self.ratio_for(commit)
      prod_lines_added = 0
      test_lines_added = 0
      commit.stats.files.each do |file|
        filename, adds, dels, total = file
        if filename =~ /spec\.rb/
          test_lines_added += adds
        elsif filename =~ /\.rb$/
          prod_lines_added += adds
        end
      end
      return 0 if test_lines_added == 0
      prod_lines_added / test_lines_added.to_f
    end
  end
end


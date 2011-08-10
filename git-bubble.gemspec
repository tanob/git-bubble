# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "git-bubble/version"

Gem::Specification.new do |s|
  s.name        = "git-bubble"
  s.version     = Git::Bubble::VERSION
  s.authors     = ["Adriano Bonat"]
  s.email       = ["adrianob@gmail.com"]
  s.homepage    = ""
  s.summary     = "A tool to generate a bubble chart from the commits of a git repo."
  s.description = "A tool to generate a bubble chart from the commits of a git repo, based on a blog post from Jonathan Wolter (http://jawspeak.com/2011/07/16/improving-developers-enthusiasm-for-unit-tests-using-bubble-charts/)."

  s.rubyforge_project = "git-bubble"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  # s.add_development_dependency "rspec"
  # s.add_runtime_dependency "rest-client"
end

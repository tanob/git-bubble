# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "git-bubble/version"

Gem::Specification.new do |s|
  s.name        = "git-bubble"
  s.version     = Git::Bubble::VERSION
  s.authors     = ["Adriano Bonat", "Vitor Baptista"]
  s.email       = ["adrianob@gmail.com", "vitor@vitorbaptista.com"]
  s.homepage    = "https://github.com/tanob/git-bubble"
  s.summary     = "A tool to generate a bubble chart from the commits of a git repo."
  s.description = "A tool to generate a bubble chart from the commits of a git repo, based on a blog post from Jonathan Wolter (http://jawspeak.com/2011/07/16/improving-developers-enthusiasm-for-unit-tests-using-bubble-charts/)."

  s.rubyforge_project = "git-bubble"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_runtime_dependency "sinatra",   "~> 1.2.6"
  s.add_runtime_dependency "haml",      "~> 3.1.2"
  s.add_runtime_dependency "vegas",     "~> 0.1.8"
  s.add_runtime_dependency "grit",      "~> 2.4.1"
  s.add_runtime_dependency "json",      "~> 1.5.3"

  s.add_development_dependency "rake"
  s.add_development_dependency "jasmine"
  s.add_development_dependency "rspec", "~> 2.6.0"
  s.add_development_dependency "rack-test", "~> 0.6.1"
end

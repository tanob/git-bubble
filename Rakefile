begin
  require 'bundler/gem_tasks'
  require 'rspec/core/rake_task'
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'

  RSpec::Core::RakeTask.new.rspec_opts = '--color'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

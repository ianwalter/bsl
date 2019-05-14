workflow "CI" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "./"
  runs = "yarn"
}

action "Lint" {
  uses = "./"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Test" {
  uses = "./"
  needs = ["Install"]
  args = "yarn test"
  secrets = [
    "BROWSERSTACK_ACCESS_KEY",
    "BROWSERSTACK_USERNAME",
  ]
}

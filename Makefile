.PHONY.: test

BIN = ./node_modules/.bin

findTests := $(shell find $(test) -type d -name __tests__ -not -path './node_modules/*')
test := .
test: $(test)
	@$(BIN)/mocha --compilers js:babel/register $(call findTests)

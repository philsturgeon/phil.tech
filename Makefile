build:
	./bin/middleman build

# I'm not happy about this, but had some bizarre issues and this fixes em. Fuck it.
deploy:
	rm -rf build && mkdir build && ./bin/middleman deploy -b

const fs = require('fs');
// const slugify = require('slugify');
const yamlFront = require('yaml-front-matter');

const user = {
  id: 1,
  name: 'Phil Sturgeon',
  slug: 'phil',
  email: 'me@philsturgeon.com',
  profile_image: '/avatars/phil.jpg',
  bio: 'I write about pragmatic API design & development, systems architecture, living and working full time on a bike (and in an electric van), and help tech folks figure out how they can use their skills to unf**k the planet.',
  website: 'https://phil.tech/',
};

const convertPost = postYaml => {
  const { title, date, __content } = postYaml;

  return {
    title,
    mobiledoc: JSON.stringify({
      version: '0.3.1',
      markups: [],
      atoms: [],
      cards: [['markdown', { cardName: 'markdown', markdown: __content.trim() }]],
      sections: [[10, 0]],
    }),
    status: 'published',
    published_at: Math.floor(new Date(date).getTime() / 1000),
    created_by: user.id,
  };
};

const main = async () => {
  files = fs.readdirSync('./src/content');

  const postsData = files
    .map(filename => {
      if (!filename.match(/\.md$/)) {
        console.log('Skipping file: ', filename);
        return;
      }
      console.log('-- found: ', filename);

      const fileContents = fs.readFileSync('./src/content/' + filename, 'utf8');
      return convertPost(yamlFront.loadFront(fileContents));
    })
    // remove skipped files
    .filter(file => file);

  const exportData = {
    data: {
      posts: postsData,
      users: [user],
    },
  };
  console.log(exportData);

  //     const filepath = `${jobsFolder}/${newFilename}`;

  //     console.log(`creating ${newFilename}`);
  //     fs.writeFileSync(filepath, newJobMarkdown, 'utf8');
  //  });
};

Promise.resolve(main());

const fs = require('fs');

const CORRECT_ANSWER_GRADE = 3;
const WRONG_ANSWER_GRADE = 1;

const githubUsername = process.env.INPUT_PR_AUTHOR_USERNAME || 'no_actor';
const githubRepositoryName = process.env.GITHUB_REPOSITORY || 'no_repository';

const jestOuputFile = fs.readFileSync(process.argv[2]);
const { testResults } = JSON.parse(jestOuputFile);

console.log(testResults)

const requirementsFile = fs.readFileSync(process.argv[3]);
const { requirements } = JSON.parse(requirementsFile);

const evaluationsByRequirements =
  testResults.map(({ assertionResults }) => (
    assertionResults.map(({ ancestorTitles, status }) => ({
      describe: ancestorTitles[ancestorTitles.length - 1],
      status
    }))
  )).flat()
    .reduce((acc, evaluation) => {
      const status = acc[evaluation.describe];
      const currentStatus = evaluation.status;
      if (!status || currentStatus === 'failed') {
        acc[evaluation.describe] = currentStatus;
        return acc;
      }
      return acc;
    }, {});

const evaluations =
    requirements.map(({ description }) => ({
      description,
      grade: (evaluationsByRequirements[description] === 'passed') ? CORRECT_ANSWER_GRADE : WRONG_ANSWER_GRADE
    }));

    console.log(evaluationsByRequirements)

fs.writeFileSync(process.argv[4], JSON.stringify({
  github_username: githubUsername,
  github_repository_name: githubRepositoryName,
  evaluations: [...evaluations]
}));

process.exit();

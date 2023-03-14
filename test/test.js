const model = require('../.');
const { UserHeader } = require('../dist/user');

async function test() {
  let userHeader = new model.UserHeader(1, {cognitoId: 'abcd1234', email: 'a@a.com', displayName: 'a'});
  let members = [new model.Membership(userHeader, false)]
  let campaigns = [new model.CampaignHeader(1, {orgId: 2, name: "myCampaign", description: "some ad stuff"})]
  let org = new model.Organization(100, {name: "fun org"}, members, campaigns);

  console.log(org);

  let j_str = JSON.stringify(org);

  console.log(j_str);

  let j = JSON.parse(j_str);

  console.log(j);

  let o = model.Organization.fromJSON(j);

  console.log(o);
}

test();
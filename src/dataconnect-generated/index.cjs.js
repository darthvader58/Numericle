const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'numericle',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewUser', inputVars);
}
createNewUserRef.operationName = 'CreateNewUser';
exports.createNewUserRef = createNewUserRef;

exports.createNewUser = function createNewUser(dcOrVars, vars) {
  return executeMutation(createNewUserRef(dcOrVars, vars));
};

const getMyStatisticsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStatistics');
}
getMyStatisticsRef.operationName = 'GetMyStatistics';
exports.getMyStatisticsRef = getMyStatisticsRef;

exports.getMyStatistics = function getMyStatistics(dc) {
  return executeQuery(getMyStatisticsRef(dc));
};

const startNewGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartNewGame', inputVars);
}
startNewGameRef.operationName = 'StartNewGame';
exports.startNewGameRef = startNewGameRef;

exports.startNewGame = function startNewGame(dcOrVars, vars) {
  return executeMutation(startNewGameRef(dcOrVars, vars));
};

const getLeaderboardRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLeaderboard');
}
getLeaderboardRef.operationName = 'GetLeaderboard';
exports.getLeaderboardRef = getLeaderboardRef;

exports.getLeaderboard = function getLeaderboard(dc) {
  return executeQuery(getLeaderboardRef(dc));
};

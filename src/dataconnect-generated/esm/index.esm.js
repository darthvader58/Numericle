import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'numericle',
  location: 'us-east4'
};

export const createNewUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewUser', inputVars);
}
createNewUserRef.operationName = 'CreateNewUser';

export function createNewUser(dcOrVars, vars) {
  return executeMutation(createNewUserRef(dcOrVars, vars));
}

export const getMyStatisticsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyStatistics');
}
getMyStatisticsRef.operationName = 'GetMyStatistics';

export function getMyStatistics(dc) {
  return executeQuery(getMyStatisticsRef(dc));
}

export const startNewGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartNewGame', inputVars);
}
startNewGameRef.operationName = 'StartNewGame';

export function startNewGame(dcOrVars, vars) {
  return executeMutation(startNewGameRef(dcOrVars, vars));
}

export const getLeaderboardRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLeaderboard');
}
getLeaderboardRef.operationName = 'GetLeaderboard';

export function getLeaderboard(dc) {
  return executeQuery(getLeaderboardRef(dc));
}


# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyStatistics*](#getmystatistics)
  - [*GetLeaderboard*](#getleaderboard)
- [**Mutations**](#mutations)
  - [*CreateNewUser*](#createnewuser)
  - [*StartNewGame*](#startnewgame)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyStatistics
You can execute the `GetMyStatistics` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyStatistics(): QueryPromise<GetMyStatisticsData, undefined>;

interface GetMyStatisticsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyStatisticsData, undefined>;
}
export const getMyStatisticsRef: GetMyStatisticsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyStatistics(dc: DataConnect): QueryPromise<GetMyStatisticsData, undefined>;

interface GetMyStatisticsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyStatisticsData, undefined>;
}
export const getMyStatisticsRef: GetMyStatisticsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyStatisticsRef:
```typescript
const name = getMyStatisticsRef.operationName;
console.log(name);
```

### Variables
The `GetMyStatistics` query has no variables.
### Return Type
Recall that executing the `GetMyStatistics` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyStatisticsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyStatisticsData {
  statistics: ({
    currentWinStreak: number;
    longestWinStreak: number;
    totalGamesPlayed: number;
    totalGamesWon: number;
    updatedAt: TimestampString;
  })[];
}
```
### Using `GetMyStatistics`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyStatistics } from '@dataconnect/generated';


// Call the `getMyStatistics()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyStatistics();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyStatistics(dataConnect);

console.log(data.statistics);

// Or, you can use the `Promise` API.
getMyStatistics().then((response) => {
  const data = response.data;
  console.log(data.statistics);
});
```

### Using `GetMyStatistics`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyStatisticsRef } from '@dataconnect/generated';


// Call the `getMyStatisticsRef()` function to get a reference to the query.
const ref = getMyStatisticsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyStatisticsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.statistics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.statistics);
});
```

## GetLeaderboard
You can execute the `GetLeaderboard` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLeaderboard(): QueryPromise<GetLeaderboardData, undefined>;

interface GetLeaderboardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLeaderboardData, undefined>;
}
export const getLeaderboardRef: GetLeaderboardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLeaderboard(dc: DataConnect): QueryPromise<GetLeaderboardData, undefined>;

interface GetLeaderboardRef {
  ...
  (dc: DataConnect): QueryRef<GetLeaderboardData, undefined>;
}
export const getLeaderboardRef: GetLeaderboardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLeaderboardRef:
```typescript
const name = getLeaderboardRef.operationName;
console.log(name);
```

### Variables
The `GetLeaderboard` query has no variables.
### Return Type
Recall that executing the `GetLeaderboard` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLeaderboardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLeaderboardData {
  leaderboardEntries: ({
    user: {
      username: string;
    };
      rank: number;
      score: number;
  })[];
}
```
### Using `GetLeaderboard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLeaderboard } from '@dataconnect/generated';


// Call the `getLeaderboard()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLeaderboard();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLeaderboard(dataConnect);

console.log(data.leaderboardEntries);

// Or, you can use the `Promise` API.
getLeaderboard().then((response) => {
  const data = response.data;
  console.log(data.leaderboardEntries);
});
```

### Using `GetLeaderboard`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLeaderboardRef } from '@dataconnect/generated';


// Call the `getLeaderboardRef()` function to get a reference to the query.
const ref = getLeaderboardRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLeaderboardRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.leaderboardEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.leaderboardEntries);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewUser
You can execute the `CreateNewUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface CreateNewUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
}
export const createNewUserRef: CreateNewUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface CreateNewUserRef {
  ...
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
}
export const createNewUserRef: CreateNewUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewUserRef:
```typescript
const name = createNewUserRef.operationName;
console.log(name);
```

### Variables
The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewUserVariables {
  username: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateNewUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewUserData {
  user_insert: User_Key;
}
```
### Using `CreateNewUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewUser, CreateNewUserVariables } from '@dataconnect/generated';

// The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`:
const createNewUserVars: CreateNewUserVariables = {
  username: ..., 
  email: ..., 
};

// Call the `createNewUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewUser(createNewUserVars);
// Variables can be defined inline as well.
const { data } = await createNewUser({ username: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewUser(dataConnect, createNewUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createNewUser(createNewUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateNewUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewUserRef, CreateNewUserVariables } from '@dataconnect/generated';

// The `CreateNewUser` mutation requires an argument of type `CreateNewUserVariables`:
const createNewUserVars: CreateNewUserVariables = {
  username: ..., 
  email: ..., 
};

// Call the `createNewUserRef()` function to get a reference to the mutation.
const ref = createNewUserRef(createNewUserVars);
// Variables can be defined inline as well.
const ref = createNewUserRef({ username: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewUserRef(dataConnect, createNewUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## StartNewGame
You can execute the `StartNewGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
startNewGame(vars: StartNewGameVariables): MutationPromise<StartNewGameData, StartNewGameVariables>;

interface StartNewGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartNewGameVariables): MutationRef<StartNewGameData, StartNewGameVariables>;
}
export const startNewGameRef: StartNewGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
startNewGame(dc: DataConnect, vars: StartNewGameVariables): MutationPromise<StartNewGameData, StartNewGameVariables>;

interface StartNewGameRef {
  ...
  (dc: DataConnect, vars: StartNewGameVariables): MutationRef<StartNewGameData, StartNewGameVariables>;
}
export const startNewGameRef: StartNewGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the startNewGameRef:
```typescript
const name = startNewGameRef.operationName;
console.log(name);
```

### Variables
The `StartNewGame` mutation requires an argument of type `StartNewGameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface StartNewGameVariables {
  difficultyLevel: string;
  maxAttempts: number;
  targetSequence: string;
}
```
### Return Type
Recall that executing the `StartNewGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `StartNewGameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface StartNewGameData {
  game_insert: Game_Key;
}
```
### Using `StartNewGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, startNewGame, StartNewGameVariables } from '@dataconnect/generated';

// The `StartNewGame` mutation requires an argument of type `StartNewGameVariables`:
const startNewGameVars: StartNewGameVariables = {
  difficultyLevel: ..., 
  maxAttempts: ..., 
  targetSequence: ..., 
};

// Call the `startNewGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await startNewGame(startNewGameVars);
// Variables can be defined inline as well.
const { data } = await startNewGame({ difficultyLevel: ..., maxAttempts: ..., targetSequence: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await startNewGame(dataConnect, startNewGameVars);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
startNewGame(startNewGameVars).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```

### Using `StartNewGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, startNewGameRef, StartNewGameVariables } from '@dataconnect/generated';

// The `StartNewGame` mutation requires an argument of type `StartNewGameVariables`:
const startNewGameVars: StartNewGameVariables = {
  difficultyLevel: ..., 
  maxAttempts: ..., 
  targetSequence: ..., 
};

// Call the `startNewGameRef()` function to get a reference to the mutation.
const ref = startNewGameRef(startNewGameVars);
// Variables can be defined inline as well.
const ref = startNewGameRef({ difficultyLevel: ..., maxAttempts: ..., targetSequence: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = startNewGameRef(dataConnect, startNewGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.game_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.game_insert);
});
```


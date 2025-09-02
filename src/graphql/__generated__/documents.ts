import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BannerForListObject = {
  __typename?: 'BannerForListObject';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imagePath: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  offerUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BannerListObject = {
  __typename?: 'BannerListObject';
  count: Scalars['Int']['output'];
  rows: Array<BannerForListObject>;
};

export type BannerObject = {
  __typename?: 'BannerObject';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imagePath: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  offerUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type ConnectCategoryToFlowInput = {
  create: Array<CreateIaAgentFlowCategoryInput>;
};

export type ConnectDisconnectPlanToIaAgentFlowInput = {
  connect?: InputMaybe<Array<UniqueFieldIdInput>>;
  disconnect?: InputMaybe<Array<UniqueFieldIdInput>>;
};

export type ConnectManyPlansToFlowInput = {
  connect: Array<UniqueFieldIdInput>;
};

export type ConnectManyToKnowledgeBaseInput = {
  connect: Array<UniqueFieldIdInput>;
};

export type ConnectOneToIaAgentInput = {
  connect: UniqueFieldIdInput;
};

export type ConnectToFolderPathInput = {
  connect: PickObjectType;
};

export type ConnectToGenericInput = {
  connect: UniqueFieldIdInput;
};

export type ConnectToMessageInput = {
  connect: UniqueFieldIdInput;
};

export type ConnectToSessionInput = {
  connect: UniqueFieldIdInput;
};

export type CreateAgentToFlowCategoryInput = {
  create: Array<IaAgentFlowCategoryOrderCreateInput>;
};

export type CreateBannerInput = {
  File: Scalars['Upload']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  offerUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDeleteManyToIaAgentInput = {
  delete?: InputMaybe<Array<UniqueFieldIdInput>>;
};

export type CreateFileInput = {
  Files: Array<Scalars['Upload']['input']>;
  Folder: ConnectToFolderPathInput;
};

export type CreateFolderInput = {
  Parent?: InputMaybe<ConnectToFolderPathInput>;
  name: Scalars['String']['input'];
};

export type CreateIaAgentFlowCategoryInput = {
  Agents?: InputMaybe<CreateAgentToFlowCategoryInput>;
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateIaAgentFlowInput = {
  Banner?: InputMaybe<Scalars['String']['input']>;
  Categories: ConnectCategoryToFlowInput;
  Plans: ConnectManyPlansToFlowInput;
  Reordered?: InputMaybe<Array<ReorderIaAgentFlowItemInput>>;
  comingSoon: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  tutorialDescription: Scalars['String']['input'];
  tutorialLink: Scalars['String']['input'];
  tutorialTitle: Scalars['String']['input'];
};

export type CreateIaAgentInput = {
  Model: ConnectOneToIaAgentInput;
  appName: Scalars['String']['input'];
  avatarInBase64?: InputMaybe<Scalars['String']['input']>;
  comingSoon?: Scalars['Boolean']['input'];
  complementaryLink?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  featured: Scalars['Boolean']['input'];
  instruction: Scalars['String']['input'];
  marketplace: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  systemMessage?: InputMaybe<Scalars['String']['input']>;
  temperature: Scalars['Float']['input'];
  tools?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateKnowledgeBaseInput = {
  Folders: ConnectManyToKnowledgeBaseInput;
  name: Scalars['String']['input'];
  qdrantCollectionName: Scalars['String']['input'];
  toolDescription: Scalars['String']['input'];
  toolName: Scalars['String']['input'];
};

export type CreateMessageInput = {
  Session: ConnectToMessageInput;
  content: Scalars['String']['input'];
  role: MessageRole;
};

export type CreateModelInput = {
  apiKey: Scalars['String']['input'];
  name: Scalars['String']['input'];
  provider: ModelProviderEnum;
  providerUrl: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreatePlanInput = {
  Limit?: InputMaybe<CreatePlanWithLimitInput>;
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreatePlanLimitInput = {
  limitType: LimitTypeEnum;
  limitValue: Scalars['Int']['input'];
  period: PeriodUnitEnum;
};

export type CreatePlanWithLimitInput = {
  create: CreatePlanLimitInput;
};

export type CreateSessionInput = {
  Agent: ConnectToSessionInput;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  gender?: InputMaybe<GenderEnum>;
  isActive?: Scalars['Boolean']['input'];
  isTest?: Scalars['Boolean']['input'];
  menteeType?: InputMaybe<MenteeTypeEnum>;
  name: Scalars['String']['input'];
  role: RoleEnum;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DefaultWhereIdInput = {
  id: Scalars['ID']['input'];
};

export type FileForListObject = {
  __typename?: 'FileForListObject';
  Folder: FolderObject;
  createdAt: Scalars['DateTime']['output'];
  folderId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type FileListObject = {
  __typename?: 'FileListObject';
  count: Scalars['Int']['output'];
  rows: Array<FileForListObject>;
};

export type FileObject = {
  __typename?: 'FileObject';
  Folder: FolderObject;
  createdAt: Scalars['DateTime']['output'];
  folderId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type FileToFolderRelationFilterInput = {
  is?: InputMaybe<ListFoldersInput>;
  isNot?: InputMaybe<ListFoldersInput>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FolderForListObject = {
  __typename?: 'FolderForListObject';
  Children?: Maybe<Array<FolderObject>>;
  Files?: Maybe<Array<FileObject>>;
  Parent?: Maybe<FolderObject>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FolderListObject = {
  __typename?: 'FolderListObject';
  count: Scalars['Int']['output'];
  rows: Array<FolderForListObject>;
};

export type FolderObject = {
  __typename?: 'FolderObject';
  Children?: Maybe<Array<FolderObject>>;
  Files?: Maybe<Array<FileObject>>;
  Parent?: Maybe<FolderObject>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FolderRelationFilter = {
  is?: InputMaybe<ListFoldersInput>;
  isNot?: InputMaybe<ListFoldersInput>;
};

export enum GenderEnum {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export type IaAgentCreateNestedOneInput = {
  connect: UniqueFieldIdInput;
};

export type IaAgentFlowCategoryObject = {
  __typename?: 'IaAgentFlowCategoryObject';
  Agents?: Maybe<Array<IaAgentFlowCategoryOrderObject>>;
  Flow: IaAgentFlowObject;
  createdAt: Scalars['DateTime']['output'];
  flowId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IaAgentFlowCategoryOrderCreateInput = {
  Agent: IaAgentCreateNestedOneInput;
  order: Scalars['Int']['input'];
};

export type IaAgentFlowCategoryOrderObject = {
  __typename?: 'IaAgentFlowCategoryOrderObject';
  Agent: IaAgentObject;
  Category?: Maybe<IaAgentFlowCategoryObject>;
  agentId: Scalars['String']['output'];
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IaAgentFlowForListObject = {
  __typename?: 'IaAgentFlowForListObject';
  Categories?: Maybe<Array<IaAgentFlowCategoryObject>>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  comingSoon: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  tutorialDescription: Scalars['String']['output'];
  tutorialLink: Scalars['String']['output'];
  tutorialTitle: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IaAgentFlowListObject = {
  __typename?: 'IaAgentFlowListObject';
  count: Scalars['Int']['output'];
  rows: Array<IaAgentFlowForListObject>;
};

export type IaAgentFlowListRelationFilter = {
  none?: InputMaybe<ListIaAgentFlowsInput>;
  some?: InputMaybe<ListIaAgentFlowsInput>;
};

export type IaAgentFlowObject = {
  __typename?: 'IaAgentFlowObject';
  Categories?: Maybe<Array<IaAgentFlowCategoryObject>>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  comingSoon: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  tutorialDescription: Scalars['String']['output'];
  tutorialLink: Scalars['String']['output'];
  tutorialTitle: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type IaAgentObject = {
  __typename?: 'IaAgentObject';
  Model: ModelObject;
  Sessions?: Maybe<Array<SessionObject>>;
  appName: Scalars['String']['output'];
  avatarPath?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  comingSoon: Scalars['Boolean']['output'];
  complementaryLink?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  featured: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  instruction: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  marketplace: Scalars['Boolean']['output'];
  modelId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemMessage?: Maybe<Scalars['String']['output']>;
  temperature: Scalars['Float']['output'];
  tools?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type IaAgentsForListObject = {
  __typename?: 'IaAgentsForListObject';
  Model: ModelObject;
  Sessions?: Maybe<Array<SessionObject>>;
  appName: Scalars['String']['output'];
  avatarPath?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  comingSoon: Scalars['Boolean']['output'];
  complementaryLink?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  featured: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  instruction: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  marketplace: Scalars['Boolean']['output'];
  modelId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemMessage?: Maybe<Scalars['String']['output']>;
  temperature: Scalars['Float']['output'];
  tools?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type IaAgentsListObject = {
  __typename?: 'IaAgentsListObject';
  count: Scalars['Int']['output'];
  rows: Array<IaAgentsForListObject>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterBase>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntFilterBase = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KnowledgeBaseFileObject = {
  __typename?: 'KnowledgeBaseFileObject';
  File: FileObject;
  KnowledgeBase: KnowledgeBaseObject;
  createdAt: Scalars['DateTime']['output'];
  fileId: Scalars['String']['output'];
  knowledgeBaseId: Scalars['String']['output'];
};

export type KnowledgeBaseForListObject = {
  __typename?: 'KnowledgeBaseForListObject';
  Files?: Maybe<Array<KnowledgeBaseFileObject>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  qdrantCollectionName: Scalars['String']['output'];
  toolDescription: Scalars['String']['output'];
  toolName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type KnowledgeBaseListObject = {
  __typename?: 'KnowledgeBaseListObject';
  count: Scalars['Int']['output'];
  rows: Array<KnowledgeBaseForListObject>;
};

export type KnowledgeBaseObject = {
  __typename?: 'KnowledgeBaseObject';
  Files?: Maybe<Array<KnowledgeBaseFileObject>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  qdrantCollectionName: Scalars['String']['output'];
  toolDescription: Scalars['String']['output'];
  toolName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum LimitTypeEnum {
  Request = 'request',
  Token = 'token'
}

export type ListBannersInput = {
  AND?: InputMaybe<Array<ListBannersInput>>;
  NOT?: InputMaybe<Array<ListBannersInput>>;
  OR?: InputMaybe<Array<ListBannersInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  offerUrl?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListDefaultInput = {
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ListFilesInput = {
  AND?: InputMaybe<Array<ListFilesInput>>;
  Folder?: InputMaybe<FileToFolderRelationFilterInput>;
  NOT?: InputMaybe<Array<ListFilesInput>>;
  OR?: InputMaybe<Array<ListFilesInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  folderId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  size?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListFoldersInput = {
  AND?: InputMaybe<Array<ListFoldersInput>>;
  NOT?: InputMaybe<Array<ListFoldersInput>>;
  OR?: InputMaybe<Array<ListFoldersInput>>;
  Parent?: InputMaybe<FolderRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parentId?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListIaAgentFlowsInput = {
  AND?: InputMaybe<Array<ListIaAgentFlowsInput>>;
  NOT?: InputMaybe<Array<ListIaAgentFlowsInput>>;
  OR?: InputMaybe<Array<ListIaAgentFlowsInput>>;
  Plans?: InputMaybe<PlanListRelationFilter>;
  bannerPath?: InputMaybe<StringFilter>;
  comingSoon?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  tutorialDescription?: InputMaybe<StringFilter>;
  tutorialLink?: InputMaybe<StringFilter>;
  tutorialTitle?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListIaAgentFlowsOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  order?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ListIaAgentsInput = {
  AND?: InputMaybe<Array<ListIaAgentsInput>>;
  NOT?: InputMaybe<Array<ListIaAgentsInput>>;
  OR?: InputMaybe<Array<ListIaAgentsInput>>;
  appName?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  featured?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  instruction?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  modelId?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  systemMessage?: InputMaybe<StringFilter>;
  temperature?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListKnowledgeBasesInput = {
  AND?: InputMaybe<Array<ListKnowledgeBasesInput>>;
  NOT?: InputMaybe<Array<ListKnowledgeBasesInput>>;
  OR?: InputMaybe<Array<ListKnowledgeBasesInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  qdrantCollectionName?: InputMaybe<StringFilter>;
  toolDescription?: InputMaybe<StringFilter>;
  toolName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListMenteesInput = {
  AND?: InputMaybe<Array<ListMenteesInput>>;
  NOT?: InputMaybe<Array<ListMenteesInput>>;
  OR?: InputMaybe<Array<ListMenteesInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ListMessagesInput = {
  AND?: InputMaybe<Array<ListMessagesInput>>;
  NOT?: InputMaybe<Array<ListMessagesInput>>;
  OR?: InputMaybe<Array<ListMessagesInput>>;
  completionTokens?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  promptTokens?: InputMaybe<IntFilter>;
  sessionId?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ListModelsInput = {
  AND?: InputMaybe<Array<ListModelsInput>>;
  NOT?: InputMaybe<Array<ListModelsInput>>;
  OR?: InputMaybe<Array<ListModelsInput>>;
  apiKey?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListPlansInput = {
  AND?: InputMaybe<Array<ListPlansInput>>;
  Flows?: InputMaybe<IaAgentFlowListRelationFilter>;
  Mentee?: InputMaybe<MenteesListRelationFilter>;
  NOT?: InputMaybe<Array<ListPlansInput>>;
  OR?: InputMaybe<Array<ListPlansInput>>;
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListSessionsInput = {
  AND?: InputMaybe<Array<ListSessionsInput>>;
  NOT?: InputMaybe<Array<ListSessionsInput>>;
  OR?: InputMaybe<Array<ListSessionsInput>>;
  agentId?: InputMaybe<StringFilter>;
  appName?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  endedAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ListUsersInput = {
  AND?: InputMaybe<Array<ListUsersInput>>;
  NOT?: InputMaybe<Array<ListUsersInput>>;
  OR?: InputMaybe<Array<ListUsersInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  encryptedPassword?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isTest?: InputMaybe<BoolFilter>;
  lastSession?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  offerUrl?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleEnumFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  verifiedEmail?: InputMaybe<BoolFilter>;
};

export type LoginObject = {
  __typename?: 'LoginObject';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type MenteeObject = {
  __typename?: 'MenteeObject';
  Limits?: Maybe<Array<MenteeUsageLimitObject>>;
  Plans?: Maybe<Array<PlanObject>>;
  User: UserObject;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  type: MenteeTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export enum MenteeTypeEnum {
  Fl = 'fl',
  Insider = 'insider',
  Plat = 'plat'
}

export type MenteeUsageLimitObject = {
  __typename?: 'MenteeUsageLimitObject';
  lastReset: Scalars['DateTime']['output'];
  limitId: Scalars['String']['output'];
  menteeId: Scalars['String']['output'];
  used: Scalars['Int']['output'];
};

export type MenteesListRelationFilter = {
  none?: InputMaybe<ListMenteesInput>;
  some?: InputMaybe<ListMenteesInput>;
};

export type MessageForListObject = {
  __typename?: 'MessageForListObject';
  Session: SessionObject;
  completionTokens?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadataJson?: Maybe<Scalars['JSON']['output']>;
  promptTokens?: Maybe<Scalars['Int']['output']>;
  role: MessageRole;
  sessionId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageListObject = {
  __typename?: 'MessageListObject';
  count: Scalars['Int']['output'];
  rows: Array<MessageForListObject>;
};

export type MessageObject = {
  __typename?: 'MessageObject';
  Session: SessionObject;
  completionTokens?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadataJson?: Maybe<Scalars['JSON']['output']>;
  promptTokens?: Maybe<Scalars['Int']['output']>;
  role: MessageRole;
  sessionId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum MessageRole {
  Assistant = 'assistant',
  System = 'system',
  Tool = 'tool',
  User = 'user'
}

export type MessageSubscriptionObject = {
  __typename?: 'MessageSubscriptionObject';
  Session: SessionObject;
  completionTokens?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadataJson?: Maybe<Scalars['JSON']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
  promptTokens?: Maybe<Scalars['Int']['output']>;
  role: MessageRole;
  sessionId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ModelForListObject = {
  __typename?: 'ModelForListObject';
  IaAgents?: Maybe<Array<IaAgentObject>>;
  apiKey: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  provider: ModelProviderEnum;
  providerUrl: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ModelListObject = {
  __typename?: 'ModelListObject';
  count: Scalars['Int']['output'];
  rows: Array<ModelForListObject>;
};

export type ModelObject = {
  __typename?: 'ModelObject';
  IaAgents?: Maybe<Array<IaAgentObject>>;
  apiKey: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  provider: ModelProviderEnum;
  providerUrl: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ModelProviderEnum {
  Anthropic = 'anthropic',
  AzureOpenAi = 'azureOpenAI',
  Custom = 'custom',
  Google = 'google',
  OpenAi = 'openAI',
  XAi = 'xAI'
}

export type Mutation = {
  __typename?: 'Mutation';
  clientLogin: LoginObject;
  createBanner: BannerObject;
  createFile: Array<FileObject>;
  createFolder: FolderObject;
  createIaAgent: IaAgentObject;
  createIaAgentFlow: IaAgentFlowObject;
  createKnowledgeBase: KnowledgeBaseObject;
  createModel: ModelObject;
  createPlan: PlanObject;
  createSession: SessionObject;
  createUser: UserObject;
  deleteBanner: BannerObject;
  deleteFolder: Scalars['String']['output'];
  deleteModel: ModelObject;
  deletePlan: PlanObject;
  login: LoginObject;
  sendMessage: MessageObject;
  updateBanner: BannerObject;
  updateFolder: FolderObject;
  updateIaAgent: IaAgentObject;
  updateIaAgentFlow: IaAgentFlowObject;
  updatePlan: PlanObject;
  updateSession: SessionObject;
  updateUser: UserObject;
  validateCode: TokenPairObject;
};


export type MutationClientLoginArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreateBannerArgs = {
  data: CreateBannerInput;
};


export type MutationCreateFileArgs = {
  data: CreateFileInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationCreateIaAgentArgs = {
  data: CreateIaAgentInput;
};


export type MutationCreateIaAgentFlowArgs = {
  data: CreateIaAgentFlowInput;
};


export type MutationCreateKnowledgeBaseArgs = {
  data: CreateKnowledgeBaseInput;
};


export type MutationCreateModelArgs = {
  data: CreateModelInput;
};


export type MutationCreatePlanArgs = {
  data: CreatePlanInput;
};


export type MutationCreateSessionArgs = {
  data: CreateSessionInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteBannerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFolderArgs = {
  folderId: Scalars['String']['input'];
};


export type MutationDeleteModelArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePlanArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  data: CreateMessageInput;
};


export type MutationUpdateBannerArgs = {
  data: UpdateBannerInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateFolderArgs = {
  data: UpdateFolderInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateIaAgentArgs = {
  data: UpdateIaAgentInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateIaAgentFlowArgs = {
  data: UpdateIAgentFlowInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdatePlanArgs = {
  data: UpdatePlanInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateSessionArgs = {
  data: UpdateSessionInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  where: DefaultWhereIdInput;
};


export type MutationValidateCodeArgs = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NestedBoolFilter = {
  equals: Scalars['Boolean']['input'];
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum PeriodUnitEnum {
  Day = 'day',
  Hour = 'hour',
  Month = 'month',
  Week = 'week',
  Year = 'year'
}

export type PickObjectType = {
  path: Scalars['String']['input'];
};

export type PlanForListObject = {
  __typename?: 'PlanForListObject';
  Agents?: Maybe<Array<IaAgentObject>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PlanListObject = {
  __typename?: 'PlanListObject';
  count: Scalars['Int']['output'];
  rows: Array<PlanForListObject>;
};

export type PlanListRelationFilter = {
  none?: InputMaybe<ListPlansInput>;
  some?: InputMaybe<ListPlansInput>;
};

export type PlanObject = {
  __typename?: 'PlanObject';
  Agents?: Maybe<Array<IaAgentObject>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getBanner: BannerObject;
  getIaAgent?: Maybe<IaAgentObject>;
  getIaAgentFlow?: Maybe<IaAgentFlowObject>;
  getPlan: PlanObject;
  getSession: SessionObject;
  getUser: UserObject;
  healthCheck: Scalars['String']['output'];
  listBanners: BannerListObject;
  listFiles: FileListObject;
  listFolders: FolderListObject;
  listIaAgentFlows: IaAgentFlowListObject;
  listIaAgents: IaAgentsListObject;
  listKnowledgeBases: KnowledgeBaseListObject;
  listMessages: MessageListObject;
  listModels: ModelListObject;
  listPlans: PlanListObject;
  listSessions: SessionListObject;
  listUsers: UserListObject;
  me: UserObject;
};


export type QueryGetBannerArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetIaAgentArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetIaAgentFlowArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPlanArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSessionArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryListBannersArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListBannersInput>;
};


export type QueryListFilesArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListFilesInput>;
};


export type QueryListFoldersArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListFoldersInput>;
};


export type QueryListIaAgentFlowsArgs = {
  orderBy?: InputMaybe<ListIaAgentFlowsOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListIaAgentFlowsInput>;
};


export type QueryListIaAgentsArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListIaAgentsInput>;
};


export type QueryListKnowledgeBasesArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListKnowledgeBasesInput>;
};


export type QueryListMessagesArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListMessagesInput>;
};


export type QueryListModelsArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListModelsInput>;
};


export type QueryListPlansArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListPlansInput>;
};


export type QueryListSessionsArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListSessionsInput>;
};


export type QueryListUsersArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListUsersInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type ReorderIaAgentFlowItemInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export enum RoleEnum {
  Admin = 'admin',
  Mentee = 'mentee',
  User = 'user'
}

export type RoleEnumFilter = {
  equals?: InputMaybe<RoleEnum>;
  in?: InputMaybe<Array<RoleEnum>>;
  notIn?: InputMaybe<Array<RoleEnum>>;
};

export type SessionForListObject = {
  __typename?: 'SessionForListObject';
  Agent: IaAgentObject;
  Messages?: Maybe<Array<MessageObject>>;
  Participants?: Maybe<Array<SessionParticipantObject>>;
  agentId: Scalars['String']['output'];
  appName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  stateJson?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type SessionListObject = {
  __typename?: 'SessionListObject';
  count: Scalars['Int']['output'];
  rows: Array<SessionForListObject>;
};

export type SessionObject = {
  __typename?: 'SessionObject';
  Agent: IaAgentObject;
  Messages?: Maybe<Array<MessageObject>>;
  Participants?: Maybe<Array<SessionParticipantObject>>;
  agentId: Scalars['String']['output'];
  appName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  stateJson?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type SessionParticipantObject = {
  __typename?: 'SessionParticipantObject';
  Session: SessionObject;
  User: UserObject;
  joinedAt: Scalars['DateTime']['output'];
  leftAt?: Maybe<Scalars['DateTime']['output']>;
  roleInSession: SessionRoleEnum;
  sessionId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export enum SessionRoleEnum {
  Admin = 'admin',
  Guest = 'guest',
  Owner = 'owner',
  Participant = 'participant',
  Support = 'support',
  System = 'system'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: MessageSubscriptionObject;
};


export type SubscriptionMessageAddedArgs = {
  sessionId: Scalars['String']['input'];
};

export type TokenPairObject = {
  __typename?: 'TokenPairObject';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UniqueFieldIdInput = {
  id: Scalars['ID']['input'];
};

export type UpdateBannerInput = {
  File?: InputMaybe<Scalars['Upload']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offerUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFolderInput = {
  Parent?: InputMaybe<ConnectToGenericInput>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIAgentFlowInput = {
  File?: InputMaybe<Scalars['Upload']['input']>;
  Plans?: InputMaybe<ConnectDisconnectPlanToIaAgentFlowInput>;
  comingSoon?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  tutorialDescription?: InputMaybe<Scalars['String']['input']>;
  tutorialLink?: InputMaybe<Scalars['String']['input']>;
  tutorialTitle?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIaAgentInput = {
  Model?: InputMaybe<ConnectOneToIaAgentInput>;
  Plans?: InputMaybe<CreateDeleteManyToIaAgentInput>;
  appName?: InputMaybe<Scalars['String']['input']>;
  avatarInBase64?: InputMaybe<Scalars['String']['input']>;
  avatarPath?: InputMaybe<Scalars['String']['input']>;
  comingSoon?: InputMaybe<Scalars['Boolean']['input']>;
  complementaryLink?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  instruction?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  marketplace?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemMessage?: InputMaybe<Scalars['String']['input']>;
  temperature?: InputMaybe<Scalars['Float']['input']>;
  tools?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdatePlanInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSessionInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isTest?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleEnum>;
};

export type UserForListObject = {
  __typename?: 'UserForListObject';
  Mentee?: Maybe<MenteeObject>;
  avatarUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isTest: Scalars['Boolean']['output'];
  lastSession?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  role: RoleEnum;
  updatedAt: Scalars['DateTime']['output'];
  verifiedEmail: Scalars['Boolean']['output'];
};

export type UserListObject = {
  __typename?: 'UserListObject';
  count: Scalars['Int']['output'];
  rows: Array<UserForListObject>;
};

export type UserObject = {
  __typename?: 'UserObject';
  Mentee?: Maybe<MenteeObject>;
  avatarUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isTest: Scalars['Boolean']['output'];
  lastSession?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  role: RoleEnum;
  updatedAt: Scalars['DateTime']['output'];
  verifiedEmail: Scalars['Boolean']['output'];
};

export type CreateBannerMutationVariables = Exact<{
  data: CreateBannerInput;
}>;


export type CreateBannerMutation = { __typename?: 'Mutation', createBanner: { __typename?: 'BannerObject', id: string } };

export type DeleteBannerMutationVariables = Exact<{
  deleteBannerId: Scalars['String']['input'];
}>;


export type DeleteBannerMutation = { __typename?: 'Mutation', deleteBanner: { __typename?: 'BannerObject', id: string } };

export type GetBannerQueryVariables = Exact<{
  getBannerId: Scalars['String']['input'];
}>;


export type GetBannerQuery = { __typename?: 'Query', getBanner: { __typename?: 'BannerObject', id: string, name: string, imagePath: string, isActive?: boolean | null, description?: string | null, offerUrl?: string | null, imageUrl: string } };

export type ListBannersQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListBannersInput>;
}>;


export type ListBannersQuery = { __typename?: 'Query', listBanners: { __typename?: 'BannerListObject', count: number, rows: Array<{ __typename?: 'BannerForListObject', id: string, name: string, imagePath: string, isActive?: boolean | null, description?: string | null, offerUrl?: string | null, imageUrl: string, createdAt: any }> } };

export type UpdateBannerMutationVariables = Exact<{
  data: UpdateBannerInput;
  where: DefaultWhereIdInput;
}>;


export type UpdateBannerMutation = { __typename?: 'Mutation', updateBanner: { __typename?: 'BannerObject', id: string } };

export type CreateFileMutationVariables = Exact<{
  data: CreateFileInput;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: Array<{ __typename?: 'FileObject', id: string }> };

export type CreateFolderMutationVariables = Exact<{
  data: CreateFolderInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'FolderObject', id: string } };

export type ListFilesQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListFilesInput>;
}>;


export type ListFilesQuery = { __typename?: 'Query', listFiles: { __typename?: 'FileListObject', count: number, rows: Array<{ __typename?: 'FileForListObject', id: string, name: string, size?: number | null, createdAt: any, url: string }> } };

export type ListFoldersQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListFoldersInput>;
}>;


export type ListFoldersQuery = { __typename?: 'Query', listFolders: { __typename?: 'FolderListObject', count: number, rows: Array<{ __typename?: 'FolderForListObject', id: string, name: string, path: string, slug: string, createdAt: any, Files?: Array<{ __typename?: 'FileObject', id: string, name: string, mimeType?: string | null, size?: number | null, createdAt: any }> | null }> } };

export type GetIaAgentFlowQueryVariables = Exact<{
  getIaAgentFlowId: Scalars['String']['input'];
}>;


export type GetIaAgentFlowQuery = { __typename?: 'Query', getIaAgentFlow?: { __typename?: 'IaAgentFlowObject', id: string, isActive: boolean, name: string, order: number, description?: string | null, tutorialDescription: string, tutorialLink: string, tutorialTitle: string, comingSoon: boolean, bannerUrl?: string | null } | null };

export type ListIaAgentFlowPlansQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListPlansInput>;
}>;


export type ListIaAgentFlowPlansQuery = { __typename?: 'Query', listPlans: { __typename?: 'PlanListObject', count: number, rows: Array<{ __typename?: 'PlanForListObject', id: string, isActive?: boolean | null, name: string, code: string }> } };

export type UpdateIaAgentFlowMutationVariables = Exact<{
  data: UpdateIAgentFlowInput;
  where: DefaultWhereIdInput;
}>;


export type UpdateIaAgentFlowMutation = { __typename?: 'Mutation', updateIaAgentFlow: { __typename?: 'IaAgentFlowObject', id: string } };

export type ListIaAgentFlowsQueryVariables = Exact<{
  orderBy?: InputMaybe<ListIaAgentFlowsOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListIaAgentFlowsInput>;
}>;


export type ListIaAgentFlowsQuery = { __typename?: 'Query', listIaAgentFlows: { __typename?: 'IaAgentFlowListObject', count: number, rows: Array<{ __typename?: 'IaAgentFlowForListObject', id: string, name: string, comingSoon: boolean, order: number, createdAt: any, isActive: boolean }> } };

export type CreateIaAgentFlowMutationVariables = Exact<{
  data: CreateIaAgentFlowInput;
}>;


export type CreateIaAgentFlowMutation = { __typename?: 'Mutation', createIaAgentFlow: { __typename?: 'IaAgentFlowObject', id: string } };

export type ListIaAgentFlowsForCreateFlowQueryVariables = Exact<{
  orderBy?: InputMaybe<ListIaAgentFlowsOrderByInput>;
}>;


export type ListIaAgentFlowsForCreateFlowQuery = { __typename?: 'Query', listIaAgentFlows: { __typename?: 'IaAgentFlowListObject', count: number, rows: Array<{ __typename?: 'IaAgentFlowForListObject', id: string, name: string, order: number }> } };

export type ListIaAgentsForCreateFlowsQueryVariables = Exact<{
  where?: InputMaybe<ListIaAgentsInput>;
  orderBy?: InputMaybe<ListDefaultInput>;
}>;


export type ListIaAgentsForCreateFlowsQuery = { __typename?: 'Query', listIaAgents: { __typename?: 'IaAgentsListObject', rows: Array<{ __typename?: 'IaAgentsForListObject', id: string, name: string }> } };

export type GetIaAgentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetIaAgentQuery = { __typename?: 'Query', getIaAgent?: { __typename?: 'IaAgentObject', id: string, name: string, appName: string, description?: string | null, avatarUrl?: string | null, marketplace: boolean, featured: boolean, isActive: boolean, systemMessage?: string | null, temperature: number, tools?: Array<string> | null, instruction: string, complementaryLink?: string | null, comingSoon: boolean, Model: { __typename?: 'ModelObject', id: string, name: string } } | null };

export type UpdateIaAgentMutationVariables = Exact<{
  data: UpdateIaAgentInput;
  where: DefaultWhereIdInput;
}>;


export type UpdateIaAgentMutation = { __typename?: 'Mutation', updateIaAgent: { __typename?: 'IaAgentObject', id: string } };

export type ListIaAgentsQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListIaAgentsInput>;
}>;


export type ListIaAgentsQuery = { __typename?: 'Query', listIaAgents: { __typename?: 'IaAgentsListObject', count: number, rows: Array<{ __typename?: 'IaAgentsForListObject', id: string, name: string, avatarUrl?: string | null, createdAt: any, marketplace: boolean, featured: boolean, isActive: boolean, Model: { __typename?: 'ModelObject', name: string } }> } };

export type CreateIaAgentMutationVariables = Exact<{
  data: CreateIaAgentInput;
}>;


export type CreateIaAgentMutation = { __typename?: 'Mutation', createIaAgent: { __typename?: 'IaAgentObject', id: string } };

export type ListModelsForCreateIaAgentQueryVariables = Exact<{
  where?: InputMaybe<ListModelsInput>;
  orderBy?: InputMaybe<ListDefaultInput>;
}>;


export type ListModelsForCreateIaAgentQuery = { __typename?: 'Query', listModels: { __typename?: 'ModelListObject', count: number, rows: Array<{ __typename?: 'ModelForListObject', id: string, name: string }> } };

export type ListPlansForCreateIaAgentQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  where?: InputMaybe<ListPlansInput>;
}>;


export type ListPlansForCreateIaAgentQuery = { __typename?: 'Query', listPlans: { __typename?: 'PlanListObject', count: number, rows: Array<{ __typename?: 'PlanForListObject', id: string, name: string, code: string }> } };

export type CreateKnowledgeBaseMutationVariables = Exact<{
  data: CreateKnowledgeBaseInput;
}>;


export type CreateKnowledgeBaseMutation = { __typename?: 'Mutation', createKnowledgeBase: { __typename?: 'KnowledgeBaseObject', id: string } };

export type ListFoldersForCreateKnowledgeBaseQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  where?: InputMaybe<ListFoldersInput>;
}>;


export type ListFoldersForCreateKnowledgeBaseQuery = { __typename?: 'Query', listFolders: { __typename?: 'FolderListObject', count: number, rows: Array<{ __typename?: 'FolderForListObject', id: string, name: string, parentId?: string | null }> } };

export type ListKnowledgeBasesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ListDefaultInput>;
  where?: InputMaybe<ListKnowledgeBasesInput>;
}>;


export type ListKnowledgeBasesQuery = { __typename?: 'Query', listKnowledgeBases: { __typename?: 'KnowledgeBaseListObject', count: number, rows: Array<{ __typename?: 'KnowledgeBaseForListObject', id: string, name: string, qdrantCollectionName: string, toolName: string, description?: string | null }> } };

export type CreateModelMutationVariables = Exact<{
  data: CreateModelInput;
}>;


export type CreateModelMutation = { __typename?: 'Mutation', createModel: { __typename?: 'ModelObject', id: string } };

export type DeleteModelMutationVariables = Exact<{
  modelId: Scalars['String']['input'];
}>;


export type DeleteModelMutation = { __typename?: 'Mutation', deleteModel: { __typename?: 'ModelObject', id: string } };

export type ListModelsQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListModelsInput>;
}>;


export type ListModelsQuery = { __typename?: 'Query', listModels: { __typename?: 'ModelListObject', count: number, rows: Array<{ __typename?: 'ModelForListObject', id: string, isActive: boolean, name: string, slug: string, provider: ModelProviderEnum, providerUrl: string, createdAt: any }> } };

export type CreatePlanMutationVariables = Exact<{
  data: CreatePlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: { __typename?: 'PlanObject', id: string } };

export type DeletePlanMutationVariables = Exact<{
  planId: Scalars['String']['input'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan: { __typename?: 'PlanObject', id: string } };

export type GetPlanQueryVariables = Exact<{
  planId: Scalars['String']['input'];
}>;


export type GetPlanQuery = { __typename?: 'Query', getPlan: { __typename?: 'PlanObject', id: string, isActive?: boolean | null, name: string, code: string } };

export type ListPlansQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListPlansInput>;
}>;


export type ListPlansQuery = { __typename?: 'Query', listPlans: { __typename?: 'PlanListObject', count: number, rows: Array<{ __typename?: 'PlanForListObject', id: string, name: string, isActive?: boolean | null, createdAt: any, code: string }> } };

export type UpdatePlanMutationVariables = Exact<{
  data: UpdatePlanInput;
  where: DefaultWhereIdInput;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'PlanObject', id: string } };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserObject', id: string, email: string, name: string, role: RoleEnum, gender?: GenderEnum | null, avatarUrl: string, isActive: boolean, isTest: boolean, lastSession?: any | null, verifiedEmail: boolean, createdAt: any, updatedAt: any, Mentee?: { __typename?: 'MenteeObject', id: string, type: MenteeTypeEnum, createdAt: any, updatedAt: any } | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
  where: DefaultWhereIdInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserObject', id: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserObject', id: string } };

export type ListUsersQueryVariables = Exact<{
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListUsersInput>;
}>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: { __typename?: 'UserListObject', count: number, rows: Array<{ __typename?: 'UserForListObject', name: string, role: RoleEnum, isTest: boolean, id: string, isActive: boolean, gender?: GenderEnum | null, email: string, createdAt: any, updatedAt: any, avatarUrl: string, lastSession?: any | null }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginObject', token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserObject', id: string, email: string, name: string, role: RoleEnum, avatarUrl: string } };


export const CreateBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBanner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBannerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBanner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateBannerMutation, CreateBannerMutationVariables>;
export const DeleteBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBanner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteBannerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBanner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteBannerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteBannerMutation, DeleteBannerMutationVariables>;
export const GetBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBanner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getBannerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBanner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getBannerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetBannerQuery, GetBannerQueryVariables>;
export const ListBannersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListBanners"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListBannersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listBanners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"offerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListBannersQuery, ListBannersQueryVariables>;
export const UpdateBannerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBanner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBannerInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultWhereIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBanner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateBannerMutation, UpdateBannerMutationVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const ListFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListFilesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<ListFilesQuery, ListFilesQueryVariables>;
export const ListFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFolders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListFoldersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFolders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"Files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListFoldersQuery, ListFoldersQueryVariables>;
export const GetIaAgentFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIaAgentFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getIaAgentFlowId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getIaAgentFlow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getIaAgentFlowId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tutorialDescription"}},{"kind":"Field","name":{"kind":"Name","value":"tutorialLink"}},{"kind":"Field","name":{"kind":"Name","value":"tutorialTitle"}},{"kind":"Field","name":{"kind":"Name","value":"comingSoon"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]} as unknown as DocumentNode<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>;
export const ListIaAgentFlowPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListIaAgentFlowPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPlansInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>;
export const UpdateIaAgentFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIaAgentFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateIAgentFlowInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultWhereIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIaAgentFlow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateIaAgentFlowMutation, UpdateIaAgentFlowMutationVariables>;
export const ListIaAgentFlowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListIaAgentFlows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListIaAgentFlowsOrderByInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListIaAgentFlowsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listIaAgentFlows"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"comingSoon"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>;
export const CreateIaAgentFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIaAgentFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIaAgentFlowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIaAgentFlow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateIaAgentFlowMutation, CreateIaAgentFlowMutationVariables>;
export const ListIaAgentFlowsForCreateFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListIaAgentFlowsForCreateFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListIaAgentFlowsOrderByInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listIaAgentFlows"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>;
export const ListIaAgentsForCreateFlowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListIaAgentsForCreateFlows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListIaAgentsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listIaAgents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>;
export const GetIaAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIaAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getIaAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"marketplace"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"systemMessage"}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}},{"kind":"Field","name":{"kind":"Name","value":"tools"}},{"kind":"Field","name":{"kind":"Name","value":"instruction"}},{"kind":"Field","name":{"kind":"Name","value":"complementaryLink"}},{"kind":"Field","name":{"kind":"Name","value":"comingSoon"}},{"kind":"Field","name":{"kind":"Name","value":"Model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetIaAgentQuery, GetIaAgentQueryVariables>;
export const UpdateIaAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIaAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateIaAgentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultWhereIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIaAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateIaAgentMutation, UpdateIaAgentMutationVariables>;
export const ListIaAgentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListIaAgents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListIaAgentsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listIaAgents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"marketplace"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"Model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListIaAgentsQuery, ListIaAgentsQueryVariables>;
export const CreateIaAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIaAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIaAgentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIaAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateIaAgentMutation, CreateIaAgentMutationVariables>;
export const ListModelsForCreateIaAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListModelsForCreateIaAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListModelsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>;
export const ListPlansForCreateIaAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPlansForCreateIaAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPlansInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>;
export const CreateKnowledgeBaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateKnowledgeBase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateKnowledgeBaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createKnowledgeBase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateKnowledgeBaseMutation, CreateKnowledgeBaseMutationVariables>;
export const ListFoldersForCreateKnowledgeBaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFoldersForCreateKnowledgeBase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListFoldersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFolders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]}}]} as unknown as DocumentNode<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>;
export const ListKnowledgeBasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListKnowledgeBases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListKnowledgeBasesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listKnowledgeBases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"qdrantCollectionName"}},{"kind":"Field","name":{"kind":"Name","value":"toolName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>;
export const CreateModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateModelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateModelMutation, CreateModelMutationVariables>;
export const DeleteModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteModelMutation, DeleteModelMutationVariables>;
export const ListModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListModelsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"providerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListModelsQuery, ListModelsQueryVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePlanMutation, DeletePlanMutationVariables>;
export const GetPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<GetPlanQuery, GetPlanQueryVariables>;
export const ListPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPlansInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<ListPlansQuery, ListPlansQueryVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlanInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultWhereIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isTest"}},{"kind":"Field","name":{"kind":"Name","value":"lastSession"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Mentee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultWhereIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isTest"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"lastSession"}}]}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
import { gql } from 'graphql-tag';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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


export const CreateBannerDocument = gql`
    mutation CreateBanner($data: CreateBannerInput!) {
  createBanner(data: $data) {
    id
  }
}
    `;
export type CreateBannerMutationFn = Apollo.MutationFunction<CreateBannerMutation, CreateBannerMutationVariables>;
export function useCreateBannerMutation(baseOptions?: Apollo.MutationHookOptions<CreateBannerMutation, CreateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBannerMutation, CreateBannerMutationVariables>(CreateBannerDocument, options);
      }
export type CreateBannerMutationHookResult = ReturnType<typeof useCreateBannerMutation>;
export type CreateBannerMutationResult = Apollo.MutationResult<CreateBannerMutation>;
export type CreateBannerMutationOptions = Apollo.BaseMutationOptions<CreateBannerMutation, CreateBannerMutationVariables>;
export const DeleteBannerDocument = gql`
    mutation DeleteBanner($deleteBannerId: String!) {
  deleteBanner(id: $deleteBannerId) {
    id
  }
}
    `;
export type DeleteBannerMutationFn = Apollo.MutationFunction<DeleteBannerMutation, DeleteBannerMutationVariables>;
export function useDeleteBannerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBannerMutation, DeleteBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBannerMutation, DeleteBannerMutationVariables>(DeleteBannerDocument, options);
      }
export type DeleteBannerMutationHookResult = ReturnType<typeof useDeleteBannerMutation>;
export type DeleteBannerMutationResult = Apollo.MutationResult<DeleteBannerMutation>;
export type DeleteBannerMutationOptions = Apollo.BaseMutationOptions<DeleteBannerMutation, DeleteBannerMutationVariables>;
export const GetBannerDocument = gql`
    query GetBanner($getBannerId: String!) {
  getBanner(id: $getBannerId) {
    id
    name
    imagePath
    isActive
    description
    offerUrl
    imageUrl
  }
}
    `;
export function useGetBannerQuery(baseOptions: Apollo.QueryHookOptions<GetBannerQuery, GetBannerQueryVariables> & ({ variables: GetBannerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBannerQuery, GetBannerQueryVariables>(GetBannerDocument, options);
      }
export function useGetBannerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBannerQuery, GetBannerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBannerQuery, GetBannerQueryVariables>(GetBannerDocument, options);
        }
export function useGetBannerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBannerQuery, GetBannerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBannerQuery, GetBannerQueryVariables>(GetBannerDocument, options);
        }
export type GetBannerQueryHookResult = ReturnType<typeof useGetBannerQuery>;
export type GetBannerLazyQueryHookResult = ReturnType<typeof useGetBannerLazyQuery>;
export type GetBannerSuspenseQueryHookResult = ReturnType<typeof useGetBannerSuspenseQuery>;
export type GetBannerQueryResult = Apollo.QueryResult<GetBannerQuery, GetBannerQueryVariables>;
export const ListBannersDocument = gql`
    query ListBanners($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListBannersInput) {
  listBanners(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      name
      imagePath
      isActive
      description
      offerUrl
      imageUrl
      createdAt
    }
  }
}
    `;
export function useListBannersQuery(baseOptions?: Apollo.QueryHookOptions<ListBannersQuery, ListBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBannersQuery, ListBannersQueryVariables>(ListBannersDocument, options);
      }
export function useListBannersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBannersQuery, ListBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBannersQuery, ListBannersQueryVariables>(ListBannersDocument, options);
        }
export function useListBannersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListBannersQuery, ListBannersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListBannersQuery, ListBannersQueryVariables>(ListBannersDocument, options);
        }
export type ListBannersQueryHookResult = ReturnType<typeof useListBannersQuery>;
export type ListBannersLazyQueryHookResult = ReturnType<typeof useListBannersLazyQuery>;
export type ListBannersSuspenseQueryHookResult = ReturnType<typeof useListBannersSuspenseQuery>;
export type ListBannersQueryResult = Apollo.QueryResult<ListBannersQuery, ListBannersQueryVariables>;
export const UpdateBannerDocument = gql`
    mutation UpdateBanner($data: UpdateBannerInput!, $where: DefaultWhereIdInput!) {
  updateBanner(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateBannerMutationFn = Apollo.MutationFunction<UpdateBannerMutation, UpdateBannerMutationVariables>;
export function useUpdateBannerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBannerMutation, UpdateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBannerMutation, UpdateBannerMutationVariables>(UpdateBannerDocument, options);
      }
export type UpdateBannerMutationHookResult = ReturnType<typeof useUpdateBannerMutation>;
export type UpdateBannerMutationResult = Apollo.MutationResult<UpdateBannerMutation>;
export type UpdateBannerMutationOptions = Apollo.BaseMutationOptions<UpdateBannerMutation, UpdateBannerMutationVariables>;
export const CreateFileDocument = gql`
    mutation CreateFile($data: CreateFileInput!) {
  createFile(data: $data) {
    id
  }
}
    `;
export type CreateFileMutationFn = Apollo.MutationFunction<CreateFileMutation, CreateFileMutationVariables>;
export function useCreateFileMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileMutation, CreateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileMutation, CreateFileMutationVariables>(CreateFileDocument, options);
      }
export type CreateFileMutationHookResult = ReturnType<typeof useCreateFileMutation>;
export type CreateFileMutationResult = Apollo.MutationResult<CreateFileMutation>;
export type CreateFileMutationOptions = Apollo.BaseMutationOptions<CreateFileMutation, CreateFileMutationVariables>;
export const CreateFolderDocument = gql`
    mutation CreateFolder($data: CreateFolderInput!) {
  createFolder(data: $data) {
    id
  }
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const ListFilesDocument = gql`
    query ListFiles($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListFilesInput) {
  listFiles(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      name
      size
      createdAt
      url
    }
  }
}
    `;
export function useListFilesQuery(baseOptions?: Apollo.QueryHookOptions<ListFilesQuery, ListFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, options);
      }
export function useListFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFilesQuery, ListFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, options);
        }
export function useListFilesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListFilesQuery, ListFilesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFilesQuery, ListFilesQueryVariables>(ListFilesDocument, options);
        }
export type ListFilesQueryHookResult = ReturnType<typeof useListFilesQuery>;
export type ListFilesLazyQueryHookResult = ReturnType<typeof useListFilesLazyQuery>;
export type ListFilesSuspenseQueryHookResult = ReturnType<typeof useListFilesSuspenseQuery>;
export type ListFilesQueryResult = Apollo.QueryResult<ListFilesQuery, ListFilesQueryVariables>;
export const ListFoldersDocument = gql`
    query ListFolders($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListFoldersInput) {
  listFolders(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      name
      path
      slug
      createdAt
      Files {
        id
        name
        mimeType
        size
        createdAt
      }
    }
  }
}
    `;
export function useListFoldersQuery(baseOptions?: Apollo.QueryHookOptions<ListFoldersQuery, ListFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFoldersQuery, ListFoldersQueryVariables>(ListFoldersDocument, options);
      }
export function useListFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFoldersQuery, ListFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFoldersQuery, ListFoldersQueryVariables>(ListFoldersDocument, options);
        }
export function useListFoldersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListFoldersQuery, ListFoldersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFoldersQuery, ListFoldersQueryVariables>(ListFoldersDocument, options);
        }
export type ListFoldersQueryHookResult = ReturnType<typeof useListFoldersQuery>;
export type ListFoldersLazyQueryHookResult = ReturnType<typeof useListFoldersLazyQuery>;
export type ListFoldersSuspenseQueryHookResult = ReturnType<typeof useListFoldersSuspenseQuery>;
export type ListFoldersQueryResult = Apollo.QueryResult<ListFoldersQuery, ListFoldersQueryVariables>;
export const GetIaAgentFlowDocument = gql`
    query GetIaAgentFlow($getIaAgentFlowId: String!) {
  getIaAgentFlow(id: $getIaAgentFlowId) {
    id
    isActive
    name
    order
    description
    tutorialDescription
    tutorialLink
    tutorialTitle
    comingSoon
    bannerUrl
  }
}
    `;
export function useGetIaAgentFlowQuery(baseOptions: Apollo.QueryHookOptions<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables> & ({ variables: GetIaAgentFlowQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>(GetIaAgentFlowDocument, options);
      }
export function useGetIaAgentFlowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>(GetIaAgentFlowDocument, options);
        }
export function useGetIaAgentFlowSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>(GetIaAgentFlowDocument, options);
        }
export type GetIaAgentFlowQueryHookResult = ReturnType<typeof useGetIaAgentFlowQuery>;
export type GetIaAgentFlowLazyQueryHookResult = ReturnType<typeof useGetIaAgentFlowLazyQuery>;
export type GetIaAgentFlowSuspenseQueryHookResult = ReturnType<typeof useGetIaAgentFlowSuspenseQuery>;
export type GetIaAgentFlowQueryResult = Apollo.QueryResult<GetIaAgentFlowQuery, GetIaAgentFlowQueryVariables>;
export const ListIaAgentFlowPlansDocument = gql`
    query ListIaAgentFlowPlans($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListPlansInput) {
  listPlans(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      isActive
      name
      code
    }
  }
}
    `;
export function useListIaAgentFlowPlansQuery(baseOptions?: Apollo.QueryHookOptions<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>(ListIaAgentFlowPlansDocument, options);
      }
export function useListIaAgentFlowPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>(ListIaAgentFlowPlansDocument, options);
        }
export function useListIaAgentFlowPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>(ListIaAgentFlowPlansDocument, options);
        }
export type ListIaAgentFlowPlansQueryHookResult = ReturnType<typeof useListIaAgentFlowPlansQuery>;
export type ListIaAgentFlowPlansLazyQueryHookResult = ReturnType<typeof useListIaAgentFlowPlansLazyQuery>;
export type ListIaAgentFlowPlansSuspenseQueryHookResult = ReturnType<typeof useListIaAgentFlowPlansSuspenseQuery>;
export type ListIaAgentFlowPlansQueryResult = Apollo.QueryResult<ListIaAgentFlowPlansQuery, ListIaAgentFlowPlansQueryVariables>;
export const UpdateIaAgentFlowDocument = gql`
    mutation UpdateIaAgentFlow($data: UpdateIAgentFlowInput!, $where: DefaultWhereIdInput!) {
  updateIaAgentFlow(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateIaAgentFlowMutationFn = Apollo.MutationFunction<UpdateIaAgentFlowMutation, UpdateIaAgentFlowMutationVariables>;
export function useUpdateIaAgentFlowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIaAgentFlowMutation, UpdateIaAgentFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIaAgentFlowMutation, UpdateIaAgentFlowMutationVariables>(UpdateIaAgentFlowDocument, options);
      }
export type UpdateIaAgentFlowMutationHookResult = ReturnType<typeof useUpdateIaAgentFlowMutation>;
export type UpdateIaAgentFlowMutationResult = Apollo.MutationResult<UpdateIaAgentFlowMutation>;
export type UpdateIaAgentFlowMutationOptions = Apollo.BaseMutationOptions<UpdateIaAgentFlowMutation, UpdateIaAgentFlowMutationVariables>;
export const ListIaAgentFlowsDocument = gql`
    query ListIaAgentFlows($orderBy: ListIaAgentFlowsOrderByInput, $skip: Int, $take: Int, $where: ListIaAgentFlowsInput) {
  listIaAgentFlows(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      name
      comingSoon
      order
      createdAt
      isActive
    }
  }
}
    `;
export function useListIaAgentFlowsQuery(baseOptions?: Apollo.QueryHookOptions<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>(ListIaAgentFlowsDocument, options);
      }
export function useListIaAgentFlowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>(ListIaAgentFlowsDocument, options);
        }
export function useListIaAgentFlowsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>(ListIaAgentFlowsDocument, options);
        }
export type ListIaAgentFlowsQueryHookResult = ReturnType<typeof useListIaAgentFlowsQuery>;
export type ListIaAgentFlowsLazyQueryHookResult = ReturnType<typeof useListIaAgentFlowsLazyQuery>;
export type ListIaAgentFlowsSuspenseQueryHookResult = ReturnType<typeof useListIaAgentFlowsSuspenseQuery>;
export type ListIaAgentFlowsQueryResult = Apollo.QueryResult<ListIaAgentFlowsQuery, ListIaAgentFlowsQueryVariables>;
export const CreateIaAgentFlowDocument = gql`
    mutation CreateIaAgentFlow($data: CreateIaAgentFlowInput!) {
  createIaAgentFlow(data: $data) {
    id
  }
}
    `;
export type CreateIaAgentFlowMutationFn = Apollo.MutationFunction<CreateIaAgentFlowMutation, CreateIaAgentFlowMutationVariables>;
export function useCreateIaAgentFlowMutation(baseOptions?: Apollo.MutationHookOptions<CreateIaAgentFlowMutation, CreateIaAgentFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIaAgentFlowMutation, CreateIaAgentFlowMutationVariables>(CreateIaAgentFlowDocument, options);
      }
export type CreateIaAgentFlowMutationHookResult = ReturnType<typeof useCreateIaAgentFlowMutation>;
export type CreateIaAgentFlowMutationResult = Apollo.MutationResult<CreateIaAgentFlowMutation>;
export type CreateIaAgentFlowMutationOptions = Apollo.BaseMutationOptions<CreateIaAgentFlowMutation, CreateIaAgentFlowMutationVariables>;
export const ListIaAgentFlowsForCreateFlowDocument = gql`
    query ListIaAgentFlowsForCreateFlow($orderBy: ListIaAgentFlowsOrderByInput) {
  listIaAgentFlows(orderBy: $orderBy) {
    count
    rows {
      id
      name
      order
    }
  }
}
    `;
export function useListIaAgentFlowsForCreateFlowQuery(baseOptions?: Apollo.QueryHookOptions<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>(ListIaAgentFlowsForCreateFlowDocument, options);
      }
export function useListIaAgentFlowsForCreateFlowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>(ListIaAgentFlowsForCreateFlowDocument, options);
        }
export function useListIaAgentFlowsForCreateFlowSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>(ListIaAgentFlowsForCreateFlowDocument, options);
        }
export type ListIaAgentFlowsForCreateFlowQueryHookResult = ReturnType<typeof useListIaAgentFlowsForCreateFlowQuery>;
export type ListIaAgentFlowsForCreateFlowLazyQueryHookResult = ReturnType<typeof useListIaAgentFlowsForCreateFlowLazyQuery>;
export type ListIaAgentFlowsForCreateFlowSuspenseQueryHookResult = ReturnType<typeof useListIaAgentFlowsForCreateFlowSuspenseQuery>;
export type ListIaAgentFlowsForCreateFlowQueryResult = Apollo.QueryResult<ListIaAgentFlowsForCreateFlowQuery, ListIaAgentFlowsForCreateFlowQueryVariables>;
export const ListIaAgentsForCreateFlowsDocument = gql`
    query ListIaAgentsForCreateFlows($where: ListIaAgentsInput, $orderBy: ListDefaultInput) {
  listIaAgents(where: $where, orderBy: $orderBy) {
    rows {
      id
      name
    }
  }
}
    `;
export function useListIaAgentsForCreateFlowsQuery(baseOptions?: Apollo.QueryHookOptions<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>(ListIaAgentsForCreateFlowsDocument, options);
      }
export function useListIaAgentsForCreateFlowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>(ListIaAgentsForCreateFlowsDocument, options);
        }
export function useListIaAgentsForCreateFlowsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>(ListIaAgentsForCreateFlowsDocument, options);
        }
export type ListIaAgentsForCreateFlowsQueryHookResult = ReturnType<typeof useListIaAgentsForCreateFlowsQuery>;
export type ListIaAgentsForCreateFlowsLazyQueryHookResult = ReturnType<typeof useListIaAgentsForCreateFlowsLazyQuery>;
export type ListIaAgentsForCreateFlowsSuspenseQueryHookResult = ReturnType<typeof useListIaAgentsForCreateFlowsSuspenseQuery>;
export type ListIaAgentsForCreateFlowsQueryResult = Apollo.QueryResult<ListIaAgentsForCreateFlowsQuery, ListIaAgentsForCreateFlowsQueryVariables>;
export const GetIaAgentDocument = gql`
    query GetIaAgent($id: String!) {
  getIaAgent(id: $id) {
    id
    name
    appName
    description
    avatarUrl
    marketplace
    featured
    isActive
    systemMessage
    temperature
    tools
    instruction
    complementaryLink
    comingSoon
    Model {
      id
      name
    }
  }
}
    `;
export function useGetIaAgentQuery(baseOptions: Apollo.QueryHookOptions<GetIaAgentQuery, GetIaAgentQueryVariables> & ({ variables: GetIaAgentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIaAgentQuery, GetIaAgentQueryVariables>(GetIaAgentDocument, options);
      }
export function useGetIaAgentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIaAgentQuery, GetIaAgentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIaAgentQuery, GetIaAgentQueryVariables>(GetIaAgentDocument, options);
        }
export function useGetIaAgentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIaAgentQuery, GetIaAgentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIaAgentQuery, GetIaAgentQueryVariables>(GetIaAgentDocument, options);
        }
export type GetIaAgentQueryHookResult = ReturnType<typeof useGetIaAgentQuery>;
export type GetIaAgentLazyQueryHookResult = ReturnType<typeof useGetIaAgentLazyQuery>;
export type GetIaAgentSuspenseQueryHookResult = ReturnType<typeof useGetIaAgentSuspenseQuery>;
export type GetIaAgentQueryResult = Apollo.QueryResult<GetIaAgentQuery, GetIaAgentQueryVariables>;
export const UpdateIaAgentDocument = gql`
    mutation UpdateIaAgent($data: UpdateIaAgentInput!, $where: DefaultWhereIdInput!) {
  updateIaAgent(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateIaAgentMutationFn = Apollo.MutationFunction<UpdateIaAgentMutation, UpdateIaAgentMutationVariables>;
export function useUpdateIaAgentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIaAgentMutation, UpdateIaAgentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIaAgentMutation, UpdateIaAgentMutationVariables>(UpdateIaAgentDocument, options);
      }
export type UpdateIaAgentMutationHookResult = ReturnType<typeof useUpdateIaAgentMutation>;
export type UpdateIaAgentMutationResult = Apollo.MutationResult<UpdateIaAgentMutation>;
export type UpdateIaAgentMutationOptions = Apollo.BaseMutationOptions<UpdateIaAgentMutation, UpdateIaAgentMutationVariables>;
export const ListIaAgentsDocument = gql`
    query ListIaAgents($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListIaAgentsInput) {
  listIaAgents(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      name
      avatarUrl
      createdAt
      marketplace
      featured
      isActive
      Model {
        name
      }
    }
  }
}
    `;
export function useListIaAgentsQuery(baseOptions?: Apollo.QueryHookOptions<ListIaAgentsQuery, ListIaAgentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIaAgentsQuery, ListIaAgentsQueryVariables>(ListIaAgentsDocument, options);
      }
export function useListIaAgentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIaAgentsQuery, ListIaAgentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIaAgentsQuery, ListIaAgentsQueryVariables>(ListIaAgentsDocument, options);
        }
export function useListIaAgentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListIaAgentsQuery, ListIaAgentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListIaAgentsQuery, ListIaAgentsQueryVariables>(ListIaAgentsDocument, options);
        }
export type ListIaAgentsQueryHookResult = ReturnType<typeof useListIaAgentsQuery>;
export type ListIaAgentsLazyQueryHookResult = ReturnType<typeof useListIaAgentsLazyQuery>;
export type ListIaAgentsSuspenseQueryHookResult = ReturnType<typeof useListIaAgentsSuspenseQuery>;
export type ListIaAgentsQueryResult = Apollo.QueryResult<ListIaAgentsQuery, ListIaAgentsQueryVariables>;
export const CreateIaAgentDocument = gql`
    mutation CreateIaAgent($data: CreateIaAgentInput!) {
  createIaAgent(data: $data) {
    id
  }
}
    `;
export type CreateIaAgentMutationFn = Apollo.MutationFunction<CreateIaAgentMutation, CreateIaAgentMutationVariables>;
export function useCreateIaAgentMutation(baseOptions?: Apollo.MutationHookOptions<CreateIaAgentMutation, CreateIaAgentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIaAgentMutation, CreateIaAgentMutationVariables>(CreateIaAgentDocument, options);
      }
export type CreateIaAgentMutationHookResult = ReturnType<typeof useCreateIaAgentMutation>;
export type CreateIaAgentMutationResult = Apollo.MutationResult<CreateIaAgentMutation>;
export type CreateIaAgentMutationOptions = Apollo.BaseMutationOptions<CreateIaAgentMutation, CreateIaAgentMutationVariables>;
export const ListModelsForCreateIaAgentDocument = gql`
    query ListModelsForCreateIaAgent($where: ListModelsInput, $orderBy: ListDefaultInput) {
  listModels(where: $where, orderBy: $orderBy) {
    count
    rows {
      id
      name
    }
  }
}
    `;
export function useListModelsForCreateIaAgentQuery(baseOptions?: Apollo.QueryHookOptions<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>(ListModelsForCreateIaAgentDocument, options);
      }
export function useListModelsForCreateIaAgentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>(ListModelsForCreateIaAgentDocument, options);
        }
export function useListModelsForCreateIaAgentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>(ListModelsForCreateIaAgentDocument, options);
        }
export type ListModelsForCreateIaAgentQueryHookResult = ReturnType<typeof useListModelsForCreateIaAgentQuery>;
export type ListModelsForCreateIaAgentLazyQueryHookResult = ReturnType<typeof useListModelsForCreateIaAgentLazyQuery>;
export type ListModelsForCreateIaAgentSuspenseQueryHookResult = ReturnType<typeof useListModelsForCreateIaAgentSuspenseQuery>;
export type ListModelsForCreateIaAgentQueryResult = Apollo.QueryResult<ListModelsForCreateIaAgentQuery, ListModelsForCreateIaAgentQueryVariables>;
export const ListPlansForCreateIaAgentDocument = gql`
    query ListPlansForCreateIaAgent($orderBy: ListDefaultInput, $where: ListPlansInput) {
  listPlans(orderBy: $orderBy, where: $where) {
    count
    rows {
      id
      name
      code
    }
  }
}
    `;
export function useListPlansForCreateIaAgentQuery(baseOptions?: Apollo.QueryHookOptions<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>(ListPlansForCreateIaAgentDocument, options);
      }
export function useListPlansForCreateIaAgentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>(ListPlansForCreateIaAgentDocument, options);
        }
export function useListPlansForCreateIaAgentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>(ListPlansForCreateIaAgentDocument, options);
        }
export type ListPlansForCreateIaAgentQueryHookResult = ReturnType<typeof useListPlansForCreateIaAgentQuery>;
export type ListPlansForCreateIaAgentLazyQueryHookResult = ReturnType<typeof useListPlansForCreateIaAgentLazyQuery>;
export type ListPlansForCreateIaAgentSuspenseQueryHookResult = ReturnType<typeof useListPlansForCreateIaAgentSuspenseQuery>;
export type ListPlansForCreateIaAgentQueryResult = Apollo.QueryResult<ListPlansForCreateIaAgentQuery, ListPlansForCreateIaAgentQueryVariables>;
export const CreateKnowledgeBaseDocument = gql`
    mutation CreateKnowledgeBase($data: CreateKnowledgeBaseInput!) {
  createKnowledgeBase(data: $data) {
    id
  }
}
    `;
export type CreateKnowledgeBaseMutationFn = Apollo.MutationFunction<CreateKnowledgeBaseMutation, CreateKnowledgeBaseMutationVariables>;
export function useCreateKnowledgeBaseMutation(baseOptions?: Apollo.MutationHookOptions<CreateKnowledgeBaseMutation, CreateKnowledgeBaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateKnowledgeBaseMutation, CreateKnowledgeBaseMutationVariables>(CreateKnowledgeBaseDocument, options);
      }
export type CreateKnowledgeBaseMutationHookResult = ReturnType<typeof useCreateKnowledgeBaseMutation>;
export type CreateKnowledgeBaseMutationResult = Apollo.MutationResult<CreateKnowledgeBaseMutation>;
export type CreateKnowledgeBaseMutationOptions = Apollo.BaseMutationOptions<CreateKnowledgeBaseMutation, CreateKnowledgeBaseMutationVariables>;
export const ListFoldersForCreateKnowledgeBaseDocument = gql`
    query ListFoldersForCreateKnowledgeBase($orderBy: ListDefaultInput, $where: ListFoldersInput) {
  listFolders(orderBy: $orderBy, where: $where) {
    count
    rows {
      id
      name
      parentId
    }
  }
}
    `;
export function useListFoldersForCreateKnowledgeBaseQuery(baseOptions?: Apollo.QueryHookOptions<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>(ListFoldersForCreateKnowledgeBaseDocument, options);
      }
export function useListFoldersForCreateKnowledgeBaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>(ListFoldersForCreateKnowledgeBaseDocument, options);
        }
export function useListFoldersForCreateKnowledgeBaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>(ListFoldersForCreateKnowledgeBaseDocument, options);
        }
export type ListFoldersForCreateKnowledgeBaseQueryHookResult = ReturnType<typeof useListFoldersForCreateKnowledgeBaseQuery>;
export type ListFoldersForCreateKnowledgeBaseLazyQueryHookResult = ReturnType<typeof useListFoldersForCreateKnowledgeBaseLazyQuery>;
export type ListFoldersForCreateKnowledgeBaseSuspenseQueryHookResult = ReturnType<typeof useListFoldersForCreateKnowledgeBaseSuspenseQuery>;
export type ListFoldersForCreateKnowledgeBaseQueryResult = Apollo.QueryResult<ListFoldersForCreateKnowledgeBaseQuery, ListFoldersForCreateKnowledgeBaseQueryVariables>;
export const ListKnowledgeBasesDocument = gql`
    query ListKnowledgeBases($skip: Int, $take: Int, $orderBy: ListDefaultInput, $where: ListKnowledgeBasesInput) {
  listKnowledgeBases(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    count
    rows {
      id
      name
      qdrantCollectionName
      toolName
      description
    }
  }
}
    `;
export function useListKnowledgeBasesQuery(baseOptions?: Apollo.QueryHookOptions<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>(ListKnowledgeBasesDocument, options);
      }
export function useListKnowledgeBasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>(ListKnowledgeBasesDocument, options);
        }
export function useListKnowledgeBasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>(ListKnowledgeBasesDocument, options);
        }
export type ListKnowledgeBasesQueryHookResult = ReturnType<typeof useListKnowledgeBasesQuery>;
export type ListKnowledgeBasesLazyQueryHookResult = ReturnType<typeof useListKnowledgeBasesLazyQuery>;
export type ListKnowledgeBasesSuspenseQueryHookResult = ReturnType<typeof useListKnowledgeBasesSuspenseQuery>;
export type ListKnowledgeBasesQueryResult = Apollo.QueryResult<ListKnowledgeBasesQuery, ListKnowledgeBasesQueryVariables>;
export const CreateModelDocument = gql`
    mutation CreateModel($data: CreateModelInput!) {
  createModel(data: $data) {
    id
  }
}
    `;
export type CreateModelMutationFn = Apollo.MutationFunction<CreateModelMutation, CreateModelMutationVariables>;
export function useCreateModelMutation(baseOptions?: Apollo.MutationHookOptions<CreateModelMutation, CreateModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModelMutation, CreateModelMutationVariables>(CreateModelDocument, options);
      }
export type CreateModelMutationHookResult = ReturnType<typeof useCreateModelMutation>;
export type CreateModelMutationResult = Apollo.MutationResult<CreateModelMutation>;
export type CreateModelMutationOptions = Apollo.BaseMutationOptions<CreateModelMutation, CreateModelMutationVariables>;
export const DeleteModelDocument = gql`
    mutation DeleteModel($modelId: String!) {
  deleteModel(id: $modelId) {
    id
  }
}
    `;
export type DeleteModelMutationFn = Apollo.MutationFunction<DeleteModelMutation, DeleteModelMutationVariables>;
export function useDeleteModelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModelMutation, DeleteModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteModelMutation, DeleteModelMutationVariables>(DeleteModelDocument, options);
      }
export type DeleteModelMutationHookResult = ReturnType<typeof useDeleteModelMutation>;
export type DeleteModelMutationResult = Apollo.MutationResult<DeleteModelMutation>;
export type DeleteModelMutationOptions = Apollo.BaseMutationOptions<DeleteModelMutation, DeleteModelMutationVariables>;
export const ListModelsDocument = gql`
    query ListModels($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListModelsInput) {
  listModels(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      isActive
      name
      slug
      provider
      providerUrl
      createdAt
    }
  }
}
    `;
export function useListModelsQuery(baseOptions?: Apollo.QueryHookOptions<ListModelsQuery, ListModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListModelsQuery, ListModelsQueryVariables>(ListModelsDocument, options);
      }
export function useListModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListModelsQuery, ListModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListModelsQuery, ListModelsQueryVariables>(ListModelsDocument, options);
        }
export function useListModelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListModelsQuery, ListModelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListModelsQuery, ListModelsQueryVariables>(ListModelsDocument, options);
        }
export type ListModelsQueryHookResult = ReturnType<typeof useListModelsQuery>;
export type ListModelsLazyQueryHookResult = ReturnType<typeof useListModelsLazyQuery>;
export type ListModelsSuspenseQueryHookResult = ReturnType<typeof useListModelsSuspenseQuery>;
export type ListModelsQueryResult = Apollo.QueryResult<ListModelsQuery, ListModelsQueryVariables>;
export const CreatePlanDocument = gql`
    mutation CreatePlan($data: CreatePlanInput!) {
  createPlan(data: $data) {
    id
  }
}
    `;
export type CreatePlanMutationFn = Apollo.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;
export function useCreatePlanMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlanMutation, CreatePlanMutationVariables>(CreatePlanDocument, options);
      }
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = Apollo.MutationResult<CreatePlanMutation>;
export type CreatePlanMutationOptions = Apollo.BaseMutationOptions<CreatePlanMutation, CreatePlanMutationVariables>;
export const DeletePlanDocument = gql`
    mutation DeletePlan($planId: String!) {
  deletePlan(id: $planId) {
    id
  }
}
    `;
export type DeletePlanMutationFn = Apollo.MutationFunction<DeletePlanMutation, DeletePlanMutationVariables>;
export function useDeletePlanMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlanMutation, DeletePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlanMutation, DeletePlanMutationVariables>(DeletePlanDocument, options);
      }
export type DeletePlanMutationHookResult = ReturnType<typeof useDeletePlanMutation>;
export type DeletePlanMutationResult = Apollo.MutationResult<DeletePlanMutation>;
export type DeletePlanMutationOptions = Apollo.BaseMutationOptions<DeletePlanMutation, DeletePlanMutationVariables>;
export const GetPlanDocument = gql`
    query GetPlan($planId: String!) {
  getPlan(id: $planId) {
    id
    isActive
    name
    code
  }
}
    `;
export function useGetPlanQuery(baseOptions: Apollo.QueryHookOptions<GetPlanQuery, GetPlanQueryVariables> & ({ variables: GetPlanQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
      }
export function useGetPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
        }
export function useGetPlanSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
        }
export type GetPlanQueryHookResult = ReturnType<typeof useGetPlanQuery>;
export type GetPlanLazyQueryHookResult = ReturnType<typeof useGetPlanLazyQuery>;
export type GetPlanSuspenseQueryHookResult = ReturnType<typeof useGetPlanSuspenseQuery>;
export type GetPlanQueryResult = Apollo.QueryResult<GetPlanQuery, GetPlanQueryVariables>;
export const ListPlansDocument = gql`
    query ListPlans($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListPlansInput) {
  listPlans(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      id
      name
      isActive
      createdAt
      code
    }
  }
}
    `;
export function useListPlansQuery(baseOptions?: Apollo.QueryHookOptions<ListPlansQuery, ListPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPlansQuery, ListPlansQueryVariables>(ListPlansDocument, options);
      }
export function useListPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlansQuery, ListPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPlansQuery, ListPlansQueryVariables>(ListPlansDocument, options);
        }
export function useListPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPlansQuery, ListPlansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPlansQuery, ListPlansQueryVariables>(ListPlansDocument, options);
        }
export type ListPlansQueryHookResult = ReturnType<typeof useListPlansQuery>;
export type ListPlansLazyQueryHookResult = ReturnType<typeof useListPlansLazyQuery>;
export type ListPlansSuspenseQueryHookResult = ReturnType<typeof useListPlansSuspenseQuery>;
export type ListPlansQueryResult = Apollo.QueryResult<ListPlansQuery, ListPlansQueryVariables>;
export const UpdatePlanDocument = gql`
    mutation UpdatePlan($data: UpdatePlanInput!, $where: DefaultWhereIdInput!) {
  updatePlan(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, options);
      }
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($getUserId: String!) {
  getUser(id: $getUserId) {
    id
    email
    name
    role
    gender
    avatarUrl
    isActive
    isTest
    lastSession
    verifiedEmail
    createdAt
    updatedAt
    Mentee {
      id
      type
      createdAt
      updatedAt
    }
  }
}
    `;
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!, $where: DefaultWhereIdInput!) {
  updateUser(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const ListUsersDocument = gql`
    query ListUsers($orderBy: ListDefaultInput, $skip: Int, $take: Int, $where: ListUsersInput) {
  listUsers(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    count
    rows {
      name
      role
      isTest
      id
      isActive
      gender
      email
      createdAt
      updatedAt
      avatarUrl
      lastSession
    }
  }
}
    `;
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export function useListUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersSuspenseQueryHookResult = ReturnType<typeof useListUsersSuspenseQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    name
    role
    avatarUrl
  }
}
    `;
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
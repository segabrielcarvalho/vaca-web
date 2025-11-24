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
  Upload: { input: any; output: any; }
};

export type AgentObject = {
  __typename?: 'AgentObject';
  Roles?: Maybe<Array<AgentRoleObject>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type AgentRoleObject = {
  __typename?: 'AgentRoleObject';
  agentId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  type: AgentTypeEnum;
};

export enum AgentTypeEnum {
  Coordinator = 'coordinator',
  Director = 'director',
  Teacher = 'teacher'
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type CoordinatorInput = {
  agentId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CorrectionEnqueueObject = {
  __typename?: 'CorrectionEnqueueObject';
  examId: Scalars['String']['output'];
  jobId?: Maybe<Scalars['String']['output']>;
  sessionId: Scalars['String']['output'];
};

export type CorrectionSessionObject = {
  __typename?: 'CorrectionSessionObject';
  examId: Scalars['String']['output'];
  sessionId: Scalars['String']['output'];
};

export enum CorrectionStatusEnum {
  Error = 'ERROR',
  Graded = 'GRADED',
  PhotoOk = 'PHOTO_OK',
  Processing = 'PROCESSING',
  Queued = 'QUEUED'
}

export type CorrectionStatusObject = {
  __typename?: 'CorrectionStatusObject';
  attempt?: Maybe<Scalars['Float']['output']>;
  correctionId?: Maybe<Scalars['String']['output']>;
  examId: Scalars['String']['output'];
  issues?: Maybe<Array<Scalars['String']['output']>>;
  maxScore?: Maybe<Scalars['Float']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sessionId: Scalars['String']['output'];
  status: CorrectionStatusEnum;
  studentRegistration?: Maybe<Scalars['String']['output']>;
};

export type CourseForListObject = {
  __typename?: 'CourseForListObject';
  Coordinator?: Maybe<AgentObject>;
  School?: Maybe<SchoolObject>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  coordinatorId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  schoolId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CourseListObject = {
  __typename?: 'CourseListObject';
  count: Scalars['Int']['output'];
  rows: Array<CourseForListObject>;
};

export type CourseObject = {
  __typename?: 'CourseObject';
  Coordinator?: Maybe<AgentObject>;
  School?: Maybe<SchoolObject>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  coordinatorId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  schoolId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCourseInput = {
  bannerPath?: InputMaybe<Scalars['String']['input']>;
  coordinator?: InputMaybe<CoordinatorInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  schoolId: Scalars['String']['input'];
};

export type CreateExamInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  fileBase64: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  klassId: Scalars['String']['input'];
  questions: Array<ExamQuestionInput>;
  title: Scalars['String']['input'];
};

export type CreateKlassInput = {
  bannerPath?: InputMaybe<Scalars['String']['input']>;
  courseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  teacher?: InputMaybe<TeacherInput>;
};

export type CreateSchoolInput = {
  bannerPath?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  director?: InputMaybe<DirectorInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateStudentInput = {
  email: Scalars['String']['input'];
  gender?: InputMaybe<GenderEnum>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  registrationNumber: Scalars['String']['input'];
};

export type CreateUserInput = {
  agentType?: InputMaybe<AgentTypeEnum>;
  email: Scalars['String']['input'];
  gender?: InputMaybe<GenderEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
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

export type DirectorInput = {
  agentId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type EnrollStudentInput = {
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  studentId?: InputMaybe<Scalars['String']['input']>;
};

export type ExamForListObject = {
  __typename?: 'ExamForListObject';
  Klass?: Maybe<KlassObject>;
  Questions?: Maybe<Array<QuestionObject>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  filePath: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  klassId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExamListObject = {
  __typename?: 'ExamListObject';
  count: Scalars['Int']['output'];
  rows: Array<ExamForListObject>;
};

export type ExamObject = {
  __typename?: 'ExamObject';
  Klass?: Maybe<KlassObject>;
  Questions?: Maybe<Array<QuestionObject>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  filePath: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  klassId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExamQuestionInput = {
  correctOptions: Array<Scalars['Int']['input']>;
  number: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['Float']['input'];
};

export enum GenderEnum {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export type GenderEnumFilter = {
  equals?: InputMaybe<GenderEnum>;
  in?: InputMaybe<Array<GenderEnum>>;
  notIn?: InputMaybe<Array<GenderEnum>>;
};

export type KlassForListObject = {
  __typename?: 'KlassForListObject';
  Course?: Maybe<CourseObject>;
  Teacher?: Maybe<AgentObject>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  courseId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  teacherId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type KlassListObject = {
  __typename?: 'KlassListObject';
  count: Scalars['Int']['output'];
  rows: Array<KlassForListObject>;
};

export type KlassObject = {
  __typename?: 'KlassObject';
  Course?: Maybe<CourseObject>;
  Teacher?: Maybe<AgentObject>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  courseId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  teacherId?: Maybe<Scalars['ID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ListCoursesInput = {
  AND?: InputMaybe<Array<ListCoursesInput>>;
  NOT?: InputMaybe<Array<ListCoursesInput>>;
  OR?: InputMaybe<Array<ListCoursesInput>>;
  bannerPath?: InputMaybe<StringFilter>;
  coordinatorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListDefaultInput = {
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ListExamsInput = {
  AND?: InputMaybe<Array<ListExamsInput>>;
  NOT?: InputMaybe<Array<ListExamsInput>>;
  OR?: InputMaybe<Array<ListExamsInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  filePath?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  klassId?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListKlassesInput = {
  AND?: InputMaybe<Array<ListKlassesInput>>;
  NOT?: InputMaybe<Array<ListKlassesInput>>;
  OR?: InputMaybe<Array<ListKlassesInput>>;
  bannerPath?: InputMaybe<StringFilter>;
  courseId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<StringFilter>;
  teacherId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListSchoolsInput = {
  AND?: InputMaybe<Array<ListSchoolsInput>>;
  NOT?: InputMaybe<Array<ListSchoolsInput>>;
  OR?: InputMaybe<Array<ListSchoolsInput>>;
  bannerPath?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  directorId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ListUsersInput = {
  AND?: InputMaybe<Array<ListUsersInput>>;
  NOT?: InputMaybe<Array<ListUsersInput>>;
  OR?: InputMaybe<Array<ListUsersInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  gender?: InputMaybe<GenderEnumFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isTest?: InputMaybe<BoolFilter>;
  lastSession?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleEnumFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  verifiedEmail?: InputMaybe<BoolFilter>;
};

export type LoginObject = {
  __typename?: 'LoginObject';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: CourseObject;
  createExam: ExamObject;
  createKlass: KlassObject;
  createSchool: SchoolObject;
  createStudents: Array<StudentObject>;
  createUser: UserObject;
  deleteUser: UserObject;
  enrollStudents: Scalars['Boolean']['output'];
  login: LoginObject;
  startCorrection: CorrectionSessionObject;
  submitCorrectionPhoto: CorrectionEnqueueObject;
  updateCourse: CourseObject;
  updateExam: ExamObject;
  updateKlass: KlassObject;
  updateSchool: SchoolObject;
  updateUser: UserObject;
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationCreateExamArgs = {
  data: CreateExamInput;
};


export type MutationCreateKlassArgs = {
  data: CreateKlassInput;
};


export type MutationCreateSchoolArgs = {
  data: CreateSchoolInput;
};


export type MutationCreateStudentsArgs = {
  data: Array<CreateStudentInput>;
  klassId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  where: DefaultWhereIdInput;
};


export type MutationEnrollStudentsArgs = {
  klassId: Scalars['String']['input'];
  students: Array<EnrollStudentInput>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationStartCorrectionArgs = {
  examId: Scalars['String']['input'];
};


export type MutationSubmitCorrectionPhotoArgs = {
  data: SubmitCorrectionInput;
};


export type MutationUpdateCourseArgs = {
  data: UpdateCourseInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateExamArgs = {
  data: UpdateExamInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateKlassArgs = {
  data: UpdateKlassInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateSchoolArgs = {
  data: UpdateSchoolInput;
  where: DefaultWhereIdInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  where: DefaultWhereIdInput;
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

export type Query = {
  __typename?: 'Query';
  getCourse: CourseObject;
  getExam: ExamObject;
  getKlass: KlassObject;
  getSchool: SchoolObject;
  getUser: UserObject;
  healthCheck: Scalars['String']['output'];
  listCourses: CourseListObject;
  listExams: ExamListObject;
  listKlasses: KlassListObject;
  listSchools: SchoolListObject;
  listUsers: UserListObject;
  me: UserObject;
};


export type QueryGetCourseArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetExamArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetKlassArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSchoolArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryListCoursesArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListCoursesInput>;
};


export type QueryListExamsArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListExamsInput>;
};


export type QueryListKlassesArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListKlassesInput>;
};


export type QueryListSchoolsArgs = {
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListSchoolsInput>;
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

export type QuestionObject = {
  __typename?: 'QuestionObject';
  correct: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  examId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  number: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
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

export type SchoolForListObject = {
  __typename?: 'SchoolForListObject';
  Director?: Maybe<AgentObject>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  directorId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SchoolListObject = {
  __typename?: 'SchoolListObject';
  count: Scalars['Int']['output'];
  rows: Array<SchoolForListObject>;
};

export type SchoolObject = {
  __typename?: 'SchoolObject';
  Director?: Maybe<AgentObject>;
  bannerPath?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  directorId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

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

export type StudentObject = {
  __typename?: 'StudentObject';
  Klasses?: Maybe<Array<KlassObject>>;
  User?: Maybe<UserObject>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  registrationNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type SubmitCorrectionInput = {
  delta?: InputMaybe<Scalars['Float']['input']>;
  examId: Scalars['String']['input'];
  fileBase64: Scalars['String']['input'];
  sessionId: Scalars['String']['input'];
  threshold?: InputMaybe<Scalars['Float']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  correctionStatus: CorrectionStatusObject;
};


export type SubscriptionCorrectionStatusArgs = {
  sessionId: Scalars['String']['input'];
};

export type TeacherInput = {
  agentId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseInput = {
  bannerPath?: InputMaybe<Scalars['String']['input']>;
  coordinator?: InputMaybe<CoordinatorInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  schoolId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExamInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  fileBase64?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  klassId?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<ExamQuestionInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateKlassInput = {
  bannerPath?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  teacher?: InputMaybe<TeacherInput>;
};

export type UpdateSchoolInput = {
  bannerPath?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  director?: InputMaybe<DirectorInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  agentType?: InputMaybe<AgentTypeEnum>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isTest?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleEnum>;
  verifiedEmail?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserForListObject = {
  __typename?: 'UserForListObject';
  Agent?: Maybe<AgentObject>;
  Student?: Maybe<StudentObject>;
  avatarUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isTest: Scalars['Boolean']['output'];
  lastSession?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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
  Agent?: Maybe<AgentObject>;
  Student?: Maybe<StudentObject>;
  avatarUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isTest: Scalars['Boolean']['output'];
  lastSession?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role: RoleEnum;
  updatedAt: Scalars['DateTime']['output'];
  verifiedEmail: Scalars['Boolean']['output'];
};

export type GetSchoolQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSchoolQuery = { __typename?: 'Query', getSchool: { __typename?: 'SchoolObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, directorId?: string | null, createdAt: any, updatedAt: any } };

export type ListCoursesBySchoolQueryVariables = Exact<{
  where?: InputMaybe<ListCoursesInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ListDefaultInput>;
}>;


export type ListCoursesBySchoolQuery = { __typename?: 'Query', listCourses: { __typename?: 'CourseListObject', count: number, rows: Array<{ __typename?: 'CourseForListObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, schoolId: string, coordinatorId?: string | null, createdAt: any, updatedAt: any }> } };

export type UpdateSchoolMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateSchoolInput;
}>;


export type UpdateSchoolMutation = { __typename?: 'Mutation', updateSchool: { __typename?: 'SchoolObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, directorId?: string | null, updatedAt: any, Director?: { __typename?: 'AgentObject', id: string, userId: string } | null } };

export type CreateKlassMutationVariables = Exact<{
  data: CreateKlassInput;
}>;


export type CreateKlassMutation = { __typename?: 'Mutation', createKlass: { __typename?: 'KlassObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, courseId: string, teacherId?: string | null, createdAt: any, updatedAt: any, Course?: { __typename?: 'CourseObject', id: string, name: string, schoolId: string } | null } };

export type GetKlassQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetKlassQuery = { __typename?: 'Query', getKlass: { __typename?: 'KlassObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, courseId: string, teacherId?: string | null, createdAt: any, updatedAt: any, Course?: { __typename?: 'CourseObject', id: string, name: string, schoolId: string } | null } };

export type ListKlassesByCourseQueryVariables = Exact<{
  where?: InputMaybe<ListKlassesInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ListDefaultInput>;
}>;


export type ListKlassesByCourseQuery = { __typename?: 'Query', listKlasses: { __typename?: 'KlassListObject', count: number, rows: Array<{ __typename?: 'KlassForListObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, courseId: string, teacherId?: string | null, createdAt: any, updatedAt: any, Course?: { __typename?: 'CourseObject', id: string, name: string, schoolId: string } | null }> } };

export type GetCourseQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCourseQuery = { __typename?: 'Query', getCourse: { __typename?: 'CourseObject', id: string, name: string, description?: string | null, isActive: boolean, schoolId: string, coordinatorId?: string | null, createdAt: any, updatedAt: any } };

export type CreateExamMutationVariables = Exact<{
  data: CreateExamInput;
}>;


export type CreateExamMutation = { __typename?: 'Mutation', createExam: { __typename?: 'ExamObject', id: string, title: string, description?: string | null, filePath: string, klassId: string, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetExamQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetExamQuery = { __typename?: 'Query', getExam: { __typename?: 'ExamObject', id: string, title: string, description?: string | null, filePath: string, klassId: string, isActive: boolean, createdAt: any, updatedAt: any, Klass?: { __typename?: 'KlassObject', id: string, name: string, courseId: string } | null, Questions?: Array<{ __typename?: 'QuestionObject', id: string, number: number, text?: string | null, value: number, correct: number }> | null } };

export type ListExamsByKlassQueryVariables = Exact<{
  where?: InputMaybe<ListExamsInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ListDefaultInput>;
}>;


export type ListExamsByKlassQuery = { __typename?: 'Query', listExams: { __typename?: 'ExamListObject', count: number, rows: Array<{ __typename?: 'ExamForListObject', id: string, title: string, description?: string | null, filePath: string, klassId: string, isActive: boolean, createdAt: any, updatedAt: any }> } };

export type UpdateExamMutationVariables = Exact<{
  where: DefaultWhereIdInput;
  data: UpdateExamInput;
}>;


export type UpdateExamMutation = { __typename?: 'Mutation', updateExam: { __typename?: 'ExamObject', id: string, title: string, description?: string | null, filePath: string, klassId: string, isActive: boolean, createdAt: any, updatedAt: any } };

export type CreateCourseMutationVariables = Exact<{
  data: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'CourseObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, schoolId: string, coordinatorId?: string | null, createdAt: any, updatedAt: any } };

export type ListUsersQueryVariables = Exact<{
  where?: InputMaybe<ListUsersInput>;
  orderBy?: InputMaybe<ListDefaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: { __typename?: 'UserListObject', count: number, rows: Array<{ __typename?: 'UserForListObject', id: string, name?: string | null, email: string, isActive: boolean, role: RoleEnum, createdAt: any }> } };

export type CreateSchoolMutationVariables = Exact<{
  data: CreateSchoolInput;
}>;


export type CreateSchoolMutation = { __typename?: 'Mutation', createSchool: { __typename?: 'SchoolObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, directorId?: string | null, createdAt: any, updatedAt: any } };

export type ListSchoolsQueryVariables = Exact<{
  where?: InputMaybe<ListSchoolsInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ListDefaultInput>;
}>;


export type ListSchoolsQuery = { __typename?: 'Query', listSchools: { __typename?: 'SchoolListObject', count: number, rows: Array<{ __typename?: 'SchoolForListObject', id: string, name: string, description?: string | null, isActive: boolean, bannerPath?: string | null, directorId?: string | null, createdAt: any, updatedAt: any }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginObject', token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserObject', id: string, email: string, name?: string | null, role: RoleEnum, avatarUrl: string } };


export const GetSchoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSchool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"directorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetSchoolQuery, GetSchoolQueryVariables>;
export const ListCoursesBySchoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListCoursesBySchool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListCoursesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"coordinatorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>;
export const UpdateSchoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSchool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSchoolInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSchool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"directorId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Director"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSchoolMutation, UpdateSchoolMutationVariables>;
export const CreateKlassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateKlass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateKlassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createKlass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateKlassMutation, CreateKlassMutationVariables>;
export const GetKlassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetKlass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getKlass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}}]}}]}}]}}]} as unknown as DocumentNode<GetKlassQuery, GetKlassQueryVariables>;
export const ListKlassesByCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListKlassesByCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListKlassesInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listKlasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}},{"kind":"Field","name":{"kind":"Name","value":"teacherId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>;
export const GetCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"coordinatorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCourseQuery, GetCourseQueryVariables>;
export const CreateExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"filePath"}},{"kind":"Field","name":{"kind":"Name","value":"klassId"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateExamMutation, CreateExamMutationVariables>;
export const GetExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"filePath"}},{"kind":"Field","name":{"kind":"Name","value":"klassId"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Klass"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"courseId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}}]}}]}}]}}]} as unknown as DocumentNode<GetExamQuery, GetExamQueryVariables>;
export const ListExamsByKlassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListExamsByKlass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListExamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listExams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"filePath"}},{"kind":"Field","name":{"kind":"Name","value":"klassId"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>;
export const UpdateExamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultWhereIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"filePath"}},{"kind":"Field","name":{"kind":"Name","value":"klassId"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateExamMutation, UpdateExamMutationVariables>;
export const CreateCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"schoolId"}},{"kind":"Field","name":{"kind":"Name","value":"coordinatorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCourseMutation, CreateCourseMutationVariables>;
export const ListUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListUsersInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListUsersQuery, ListUsersQueryVariables>;
export const CreateSchoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSchool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSchoolInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSchool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"directorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateSchoolMutation, CreateSchoolMutationVariables>;
export const ListSchoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListSchools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListSchoolsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ListDefaultInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listSchools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPath"}},{"kind":"Field","name":{"kind":"Name","value":"directorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListSchoolsQuery, ListSchoolsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
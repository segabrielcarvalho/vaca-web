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


export const GetSchoolDocument = gql`
    query GetSchool($id: String!) {
  getSchool(id: $id) {
    id
    name
    description
    isActive
    bannerPath
    directorId
    createdAt
    updatedAt
  }
}
    `;
export function useGetSchoolQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables> & ({ variables: GetSchoolQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
      }
export function useGetSchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
        }
export function useGetSchoolSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSchoolQuery, GetSchoolQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSchoolQuery, GetSchoolQueryVariables>(GetSchoolDocument, options);
        }
export type GetSchoolQueryHookResult = ReturnType<typeof useGetSchoolQuery>;
export type GetSchoolLazyQueryHookResult = ReturnType<typeof useGetSchoolLazyQuery>;
export type GetSchoolSuspenseQueryHookResult = ReturnType<typeof useGetSchoolSuspenseQuery>;
export type GetSchoolQueryResult = Apollo.QueryResult<GetSchoolQuery, GetSchoolQueryVariables>;
export const ListCoursesBySchoolDocument = gql`
    query ListCoursesBySchool($where: ListCoursesInput, $skip: Int, $take: Int, $orderBy: ListDefaultInput) {
  listCourses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    count
    rows {
      id
      name
      description
      isActive
      bannerPath
      schoolId
      coordinatorId
      createdAt
      updatedAt
    }
  }
}
    `;
export function useListCoursesBySchoolQuery(baseOptions?: Apollo.QueryHookOptions<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>(ListCoursesBySchoolDocument, options);
      }
export function useListCoursesBySchoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>(ListCoursesBySchoolDocument, options);
        }
export function useListCoursesBySchoolSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>(ListCoursesBySchoolDocument, options);
        }
export type ListCoursesBySchoolQueryHookResult = ReturnType<typeof useListCoursesBySchoolQuery>;
export type ListCoursesBySchoolLazyQueryHookResult = ReturnType<typeof useListCoursesBySchoolLazyQuery>;
export type ListCoursesBySchoolSuspenseQueryHookResult = ReturnType<typeof useListCoursesBySchoolSuspenseQuery>;
export type ListCoursesBySchoolQueryResult = Apollo.QueryResult<ListCoursesBySchoolQuery, ListCoursesBySchoolQueryVariables>;
export const UpdateSchoolDocument = gql`
    mutation UpdateSchool($id: ID!, $data: UpdateSchoolInput!) {
  updateSchool(where: {id: $id}, data: $data) {
    id
    name
    description
    isActive
    bannerPath
    directorId
    updatedAt
    Director {
      id
      userId
    }
  }
}
    `;
export type UpdateSchoolMutationFn = Apollo.MutationFunction<UpdateSchoolMutation, UpdateSchoolMutationVariables>;
export function useUpdateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchoolMutation, UpdateSchoolMutationVariables>(UpdateSchoolDocument, options);
      }
export type UpdateSchoolMutationHookResult = ReturnType<typeof useUpdateSchoolMutation>;
export type UpdateSchoolMutationResult = Apollo.MutationResult<UpdateSchoolMutation>;
export type UpdateSchoolMutationOptions = Apollo.BaseMutationOptions<UpdateSchoolMutation, UpdateSchoolMutationVariables>;
export const CreateKlassDocument = gql`
    mutation CreateKlass($data: CreateKlassInput!) {
  createKlass(data: $data) {
    id
    name
    description
    isActive
    bannerPath
    courseId
    teacherId
    createdAt
    updatedAt
    Course {
      id
      name
      schoolId
    }
  }
}
    `;
export type CreateKlassMutationFn = Apollo.MutationFunction<CreateKlassMutation, CreateKlassMutationVariables>;
export function useCreateKlassMutation(baseOptions?: Apollo.MutationHookOptions<CreateKlassMutation, CreateKlassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateKlassMutation, CreateKlassMutationVariables>(CreateKlassDocument, options);
      }
export type CreateKlassMutationHookResult = ReturnType<typeof useCreateKlassMutation>;
export type CreateKlassMutationResult = Apollo.MutationResult<CreateKlassMutation>;
export type CreateKlassMutationOptions = Apollo.BaseMutationOptions<CreateKlassMutation, CreateKlassMutationVariables>;
export const GetKlassDocument = gql`
    query GetKlass($id: String!) {
  getKlass(id: $id) {
    id
    name
    description
    isActive
    bannerPath
    courseId
    teacherId
    createdAt
    updatedAt
    Course {
      id
      name
      schoolId
    }
  }
}
    `;
export function useGetKlassQuery(baseOptions: Apollo.QueryHookOptions<GetKlassQuery, GetKlassQueryVariables> & ({ variables: GetKlassQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKlassQuery, GetKlassQueryVariables>(GetKlassDocument, options);
      }
export function useGetKlassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKlassQuery, GetKlassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKlassQuery, GetKlassQueryVariables>(GetKlassDocument, options);
        }
export function useGetKlassSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetKlassQuery, GetKlassQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetKlassQuery, GetKlassQueryVariables>(GetKlassDocument, options);
        }
export type GetKlassQueryHookResult = ReturnType<typeof useGetKlassQuery>;
export type GetKlassLazyQueryHookResult = ReturnType<typeof useGetKlassLazyQuery>;
export type GetKlassSuspenseQueryHookResult = ReturnType<typeof useGetKlassSuspenseQuery>;
export type GetKlassQueryResult = Apollo.QueryResult<GetKlassQuery, GetKlassQueryVariables>;
export const ListKlassesByCourseDocument = gql`
    query ListKlassesByCourse($where: ListKlassesInput, $skip: Int, $take: Int, $orderBy: ListDefaultInput) {
  listKlasses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    count
    rows {
      id
      name
      description
      isActive
      bannerPath
      courseId
      teacherId
      createdAt
      updatedAt
      Course {
        id
        name
        schoolId
      }
    }
  }
}
    `;
export function useListKlassesByCourseQuery(baseOptions?: Apollo.QueryHookOptions<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>(ListKlassesByCourseDocument, options);
      }
export function useListKlassesByCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>(ListKlassesByCourseDocument, options);
        }
export function useListKlassesByCourseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>(ListKlassesByCourseDocument, options);
        }
export type ListKlassesByCourseQueryHookResult = ReturnType<typeof useListKlassesByCourseQuery>;
export type ListKlassesByCourseLazyQueryHookResult = ReturnType<typeof useListKlassesByCourseLazyQuery>;
export type ListKlassesByCourseSuspenseQueryHookResult = ReturnType<typeof useListKlassesByCourseSuspenseQuery>;
export type ListKlassesByCourseQueryResult = Apollo.QueryResult<ListKlassesByCourseQuery, ListKlassesByCourseQueryVariables>;
export const GetCourseDocument = gql`
    query GetCourse($id: String!) {
  getCourse(id: $id) {
    id
    name
    description
    isActive
    schoolId
    coordinatorId
    createdAt
    updatedAt
  }
}
    `;
export function useGetCourseQuery(baseOptions: Apollo.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables> & ({ variables: GetCourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
      }
export function useGetCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export function useGetCourseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>;
export type GetCourseSuspenseQueryHookResult = ReturnType<typeof useGetCourseSuspenseQuery>;
export type GetCourseQueryResult = Apollo.QueryResult<GetCourseQuery, GetCourseQueryVariables>;
export const CreateExamDocument = gql`
    mutation CreateExam($data: CreateExamInput!) {
  createExam(data: $data) {
    id
    title
    description
    filePath
    klassId
    isActive
    createdAt
    updatedAt
  }
}
    `;
export type CreateExamMutationFn = Apollo.MutationFunction<CreateExamMutation, CreateExamMutationVariables>;
export function useCreateExamMutation(baseOptions?: Apollo.MutationHookOptions<CreateExamMutation, CreateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExamMutation, CreateExamMutationVariables>(CreateExamDocument, options);
      }
export type CreateExamMutationHookResult = ReturnType<typeof useCreateExamMutation>;
export type CreateExamMutationResult = Apollo.MutationResult<CreateExamMutation>;
export type CreateExamMutationOptions = Apollo.BaseMutationOptions<CreateExamMutation, CreateExamMutationVariables>;
export const GetExamDocument = gql`
    query GetExam($id: String!) {
  getExam(id: $id) {
    id
    title
    description
    filePath
    klassId
    isActive
    createdAt
    updatedAt
    Klass {
      id
      name
      courseId
    }
    Questions {
      id
      number
      text
      value
      correct
    }
  }
}
    `;
export function useGetExamQuery(baseOptions: Apollo.QueryHookOptions<GetExamQuery, GetExamQueryVariables> & ({ variables: GetExamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExamQuery, GetExamQueryVariables>(GetExamDocument, options);
      }
export function useGetExamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExamQuery, GetExamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExamQuery, GetExamQueryVariables>(GetExamDocument, options);
        }
export function useGetExamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExamQuery, GetExamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExamQuery, GetExamQueryVariables>(GetExamDocument, options);
        }
export type GetExamQueryHookResult = ReturnType<typeof useGetExamQuery>;
export type GetExamLazyQueryHookResult = ReturnType<typeof useGetExamLazyQuery>;
export type GetExamSuspenseQueryHookResult = ReturnType<typeof useGetExamSuspenseQuery>;
export type GetExamQueryResult = Apollo.QueryResult<GetExamQuery, GetExamQueryVariables>;
export const ListExamsByKlassDocument = gql`
    query ListExamsByKlass($where: ListExamsInput, $skip: Int, $take: Int, $orderBy: ListDefaultInput) {
  listExams(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    count
    rows {
      id
      title
      description
      filePath
      klassId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export function useListExamsByKlassQuery(baseOptions?: Apollo.QueryHookOptions<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>(ListExamsByKlassDocument, options);
      }
export function useListExamsByKlassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>(ListExamsByKlassDocument, options);
        }
export function useListExamsByKlassSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>(ListExamsByKlassDocument, options);
        }
export type ListExamsByKlassQueryHookResult = ReturnType<typeof useListExamsByKlassQuery>;
export type ListExamsByKlassLazyQueryHookResult = ReturnType<typeof useListExamsByKlassLazyQuery>;
export type ListExamsByKlassSuspenseQueryHookResult = ReturnType<typeof useListExamsByKlassSuspenseQuery>;
export type ListExamsByKlassQueryResult = Apollo.QueryResult<ListExamsByKlassQuery, ListExamsByKlassQueryVariables>;
export const UpdateExamDocument = gql`
    mutation UpdateExam($where: DefaultWhereIdInput!, $data: UpdateExamInput!) {
  updateExam(where: $where, data: $data) {
    id
    title
    description
    filePath
    klassId
    isActive
    createdAt
    updatedAt
  }
}
    `;
export type UpdateExamMutationFn = Apollo.MutationFunction<UpdateExamMutation, UpdateExamMutationVariables>;
export function useUpdateExamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExamMutation, UpdateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExamMutation, UpdateExamMutationVariables>(UpdateExamDocument, options);
      }
export type UpdateExamMutationHookResult = ReturnType<typeof useUpdateExamMutation>;
export type UpdateExamMutationResult = Apollo.MutationResult<UpdateExamMutation>;
export type UpdateExamMutationOptions = Apollo.BaseMutationOptions<UpdateExamMutation, UpdateExamMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($data: CreateCourseInput!) {
  createCourse(data: $data) {
    id
    name
    description
    isActive
    bannerPath
    schoolId
    coordinatorId
    createdAt
    updatedAt
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const ListUsersDocument = gql`
    query ListUsers($where: ListUsersInput, $orderBy: ListDefaultInput, $skip: Int, $take: Int) {
  listUsers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
    count
    rows {
      id
      name
      email
      isActive
      role
      createdAt
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
export const CreateSchoolDocument = gql`
    mutation CreateSchool($data: CreateSchoolInput!) {
  createSchool(data: $data) {
    id
    name
    description
    isActive
    bannerPath
    directorId
    createdAt
    updatedAt
  }
}
    `;
export type CreateSchoolMutationFn = Apollo.MutationFunction<CreateSchoolMutation, CreateSchoolMutationVariables>;
export function useCreateSchoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateSchoolMutation, CreateSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSchoolMutation, CreateSchoolMutationVariables>(CreateSchoolDocument, options);
      }
export type CreateSchoolMutationHookResult = ReturnType<typeof useCreateSchoolMutation>;
export type CreateSchoolMutationResult = Apollo.MutationResult<CreateSchoolMutation>;
export type CreateSchoolMutationOptions = Apollo.BaseMutationOptions<CreateSchoolMutation, CreateSchoolMutationVariables>;
export const ListSchoolsDocument = gql`
    query ListSchools($where: ListSchoolsInput, $skip: Int, $take: Int, $orderBy: ListDefaultInput) {
  listSchools(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    count
    rows {
      id
      name
      description
      isActive
      bannerPath
      directorId
      createdAt
      updatedAt
    }
  }
}
    `;
export function useListSchoolsQuery(baseOptions?: Apollo.QueryHookOptions<ListSchoolsQuery, ListSchoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSchoolsQuery, ListSchoolsQueryVariables>(ListSchoolsDocument, options);
      }
export function useListSchoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSchoolsQuery, ListSchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSchoolsQuery, ListSchoolsQueryVariables>(ListSchoolsDocument, options);
        }
export function useListSchoolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListSchoolsQuery, ListSchoolsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSchoolsQuery, ListSchoolsQueryVariables>(ListSchoolsDocument, options);
        }
export type ListSchoolsQueryHookResult = ReturnType<typeof useListSchoolsQuery>;
export type ListSchoolsLazyQueryHookResult = ReturnType<typeof useListSchoolsLazyQuery>;
export type ListSchoolsSuspenseQueryHookResult = ReturnType<typeof useListSchoolsSuspenseQuery>;
export type ListSchoolsQueryResult = Apollo.QueryResult<ListSchoolsQuery, ListSchoolsQueryVariables>;
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
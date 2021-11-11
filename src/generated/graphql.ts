import { useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://intent-shad-91.hasura.app/v1/graphql", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "ai_color" */
export type Ai_Color = {
  __typename?: 'ai_color';
  color: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  source_color_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};

/** order by aggregate values of table "ai_color" */
export type Ai_Color_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Ai_Color_Max_Order_By>;
  min?: Maybe<Ai_Color_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "ai_color". All fields are combined with a logical 'AND'. */
export type Ai_Color_Bool_Exp = {
  _and?: Maybe<Array<Ai_Color_Bool_Exp>>;
  _not?: Maybe<Ai_Color_Bool_Exp>;
  _or?: Maybe<Array<Ai_Color_Bool_Exp>>;
  color?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  source_color_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** order by max() on columns of table "ai_color" */
export type Ai_Color_Max_Order_By = {
  color?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  source_color_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** order by min() on columns of table "ai_color" */
export type Ai_Color_Min_Order_By = {
  color?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  source_color_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "ai_color". */
export type Ai_Color_Order_By = {
  color?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  source_color_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "ai_color" */
export enum Ai_Color_Select_Column {
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  SourceColorId = 'source_color_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "color" */
export type Color = {
  __typename?: 'color';
  color: Scalars['String'];
  /** An array relationship */
  complementary_colors: Array<Ai_Color>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "color" */
export type ColorComplementary_ColorsArgs = {
  distinct_on?: Maybe<Array<Ai_Color_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ai_Color_Order_By>>;
  where?: Maybe<Ai_Color_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "color". All fields are combined with a logical 'AND'. */
export type Color_Bool_Exp = {
  _and?: Maybe<Array<Color_Bool_Exp>>;
  _not?: Maybe<Color_Bool_Exp>;
  _or?: Maybe<Array<Color_Bool_Exp>>;
  color?: Maybe<String_Comparison_Exp>;
  complementary_colors?: Maybe<Ai_Color_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** input type for inserting data into table "color" */
export type Color_Insert_Input = {
  color?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "color" */
export type Color_Mutation_Response = {
  __typename?: 'color_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Color>;
};

/** Ordering options when selecting data from "color". */
export type Color_Order_By = {
  color?: Maybe<Order_By>;
  complementary_colors_aggregate?: Maybe<Ai_Color_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "color" */
export enum Color_Select_Column {
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert data into the table: "color" */
  insert_color?: Maybe<Color_Mutation_Response>;
  /** insert a single row into the table: "color" */
  insert_color_one?: Maybe<Color>;
};


/** mutation root */
export type Mutation_RootInsert_ColorArgs = {
  objects: Array<Color_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Color_OneArgs = {
  object: Color_Insert_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "ai_color" */
  ai_color: Array<Ai_Color>;
  /** fetch data from the table: "ai_color" using primary key columns */
  ai_color_by_pk?: Maybe<Ai_Color>;
  /** fetch data from the table: "color" */
  color: Array<Color>;
  /** fetch data from the table: "color" using primary key columns */
  color_by_pk?: Maybe<Color>;
};


export type Query_RootAi_ColorArgs = {
  distinct_on?: Maybe<Array<Ai_Color_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ai_Color_Order_By>>;
  where?: Maybe<Ai_Color_Bool_Exp>;
};


export type Query_RootAi_Color_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootColorArgs = {
  distinct_on?: Maybe<Array<Color_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Color_Order_By>>;
  where?: Maybe<Color_Bool_Exp>;
};


export type Query_RootColor_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "ai_color" */
  ai_color: Array<Ai_Color>;
  /** fetch data from the table: "ai_color" using primary key columns */
  ai_color_by_pk?: Maybe<Ai_Color>;
  /** fetch data from the table: "color" */
  color: Array<Color>;
  /** fetch data from the table: "color" using primary key columns */
  color_by_pk?: Maybe<Color>;
};


export type Subscription_RootAi_ColorArgs = {
  distinct_on?: Maybe<Array<Ai_Color_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ai_Color_Order_By>>;
  where?: Maybe<Ai_Color_Bool_Exp>;
};


export type Subscription_RootAi_Color_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootColorArgs = {
  distinct_on?: Maybe<Array<Color_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Color_Order_By>>;
  where?: Maybe<Color_Bool_Exp>;
};


export type Subscription_RootColor_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type InsertColorOneMutationVariables = Exact<{
  hex?: Maybe<Scalars['String']>;
}>;


export type InsertColorOneMutation = { __typename?: 'mutation_root', insert_color_one?: { __typename?: 'color', color: string, complementary_colors: Array<{ __typename?: 'ai_color', color: string }> } | null | undefined };


export const InsertColorOneDocument = `
    mutation InsertColorOne($hex: String) {
  insert_color_one(object: {color: $hex}) {
    color
    complementary_colors {
      color
    }
  }
}
    `;
export const useInsertColorOneMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertColorOneMutation, TError, InsertColorOneMutationVariables, TContext>) =>
    useMutation<InsertColorOneMutation, TError, InsertColorOneMutationVariables, TContext>(
      'InsertColorOne',
      (variables?: InsertColorOneMutationVariables) => fetcher<InsertColorOneMutation, InsertColorOneMutationVariables>(InsertColorOneDocument, variables)(),
      options
    );
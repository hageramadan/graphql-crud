// ---- Companies ----
export const GET_COMPANIES = `
  query {
    companies {
      id
      name
      slogan
      users {
        id
        firstName
        age
      }
    }
  }
`;

export const ADD_COMPANY = `
  mutation ($name: String!, $slogan: String) {
    addCompany(name: $name, slogan: $slogan) {
      id
      name
      slogan
    }
  }
`;

export const DELETE_COMPANY = `
  mutation ($id: ID!) {
    deleteCompany(id: $id) {
      id
      name
    }
  }
`;

// ---- Users ----
export const GET_USERS = `
  query {
    users {
      id
      firstName
      age
      company {
        id
        name
      }
    }
  }
`;

export const ADD_USER = `
  mutation ($firstName: String!, $age: Int, $companyId: ID) {
    addUser(firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
      company {
        id
        name
      }
    }
  }
`;

export const DELETE_USER = `
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
    }
  }
`;
export const UPDATE_USER = `
  mutation UpdateUser($id: ID!, $firstName: String!, $age: Int!, $companyId: ID!) {
    updateUser(id: $id, firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
      company {
        name
      }
    }
  }
`;

export const UPDATE_COMPANY = `
  mutation UpdateCompany($id: ID!, $name: String!, $slogan: String) {
    updateCompany(id: $id, name: $name, slogan: $slogan) {
      id
      name
      slogan
      users {
        id
        firstName
        age
      }
    }
  }
`;

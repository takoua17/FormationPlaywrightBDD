import { APIRequestContext, APIResponse } from "@playwright/test";

const apiBaseUrl =
  process.env.API_BASE_URL || "https://automationexercise.com/api";

export class CompteApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async creerCompte(data: {
    name: string;
    email: string;
    password: string;
    title: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
  }): Promise<APIResponse> {
    return await this.request.post(`${apiBaseUrl}/createAccount`, {
      form: data,
    });
  }
  //parser la reponse
  async parseReponse(reponse: APIResponse): Promise<{
    code: number;
    message: string;
    user: Record<string, unknown>;
  }> {
    const body = await reponse.json();
    return {
      code: body.responseCode,
      message: body.message,
      user: body.user,
    };
  }

  async getUserEmail(email: string, password: string): Promise<APIResponse> {
    return await this.request.get(`${apiBaseUrl}/getUserDetailByEmail`, {
      params: {
        email,
        password,
      },
    });
  }
  //update
  async updateCompte(data: {
    name: string;
    email: string;
    password: string;
    title: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
  }): Promise<APIResponse> {
    return await this.request.put(`${apiBaseUrl}/updateAccount`, {
      form: data,
    });
  }
 
  //deleteAccount
  async deleteAccount(email: string, password: string): Promise<APIResponse> {
    return await this.request.delete(`${apiBaseUrl}/deleteAccount`, {
      form: {
        email,
        password,
      },
    });
  }
}
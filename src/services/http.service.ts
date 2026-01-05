import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GenericHttpService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.get<T>(url, config),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.post<T>(url, body, config),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.put<T>(url, body, config),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.delete<T>(url, config),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): HttpException {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data || error?.message || 'HTTP request failed';

    return new HttpException(message, status);
  }
}

import axios, { type AxiosResponse } from "axios"

type ChartResponse = {
  heartbeats: number
  fig: string
}

const api = {
  get: {
    chart: {
      battery: {
        byHours: async function (
          hours: number,
          theme: string,
        ): Promise<ChartResponse> {
          const resp: AxiosResponse<ChartResponse> = await axios.get(
            "/api/charts/battery/by-hours",
            {
              params: {
                hours: hours,
                theme: theme,
              },
            },
          )
          return resp.data
        },
        byRange: async function (
          before: Date,
          after: Date,
          theme: string,
        ): Promise<ChartResponse> {
          const resp: AxiosResponse<ChartResponse> = await axios.get(
            "/api/charts/battery/by-range",
            {
              params: {
                before: before.toISOString(),
                after: after.toISOString(),
                theme: theme,
              },
            },
          )
          return resp.data
        },
      },
      cpu: {
        byHours: async function (
          cpus: string[],
          hours: number,
          theme: string,
        ): Promise<ChartResponse> {
          const resp: AxiosResponse<ChartResponse> = await axios.get(
            "/api/charts/cpu/by-hours",
            {
              params: {
                cpus: cpus.join(","),
                hours: hours,
                theme: theme,
              },
            },
          )
          return resp.data
        },
        byRange: async function (
          cpus: string[],
          before: Date,
          after: Date,
          theme: string,
        ): Promise<ChartResponse> {
          const resp: AxiosResponse<ChartResponse> = await axios.get(
            "/api/charts/cpu/by-range",
            {
              params: {
                cpus: cpus.join(","),
                before: before.toISOString(),
                after: after.toISOString(),
                theme: theme,
              },
            },
          )
          return resp.data
        },
      },
    },
  },
}

export default api

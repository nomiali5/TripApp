#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Trip-App-Api/Trip-App-Api.csproj", "Trip-App-Api/"]
RUN dotnet restore "Trip-App-Api/Trip-App-Api.csproj"
COPY . .
WORKDIR "/src/Trip-App-Api"
RUN dotnet build "Trip-App-Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Trip-App-Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Trip-App-Api.dll"]
<div align="center">
  <h1>NestJS-Unleash-SDK</h1>
  <p>
  A <a href="https://nestjs.com/">NestJS</a> module that uses <a href="https://github.com/Unleash/unleash-client-node">Unleash SDK</a> to manage feature flags.
  </p>
</div>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## Getting Started

To start using this module, you can follow these steps:

- Install the package by running npm install nestjs-unleash-sdk
- Import the module into your NestJS application using the following code:

### Setup the module

```bash
import { Module } from '@nestjs/common';
import { UnleashModule } from 'nestjs-unleash-sdk';

@Module({
  imports: [
    UnleashModule.forRoot({
      url: 'https://unleash.herokuapp.com/api',
      appName: 'nestjs-app',
      instanceId: 'to-define',
    }),
  ],
})
export class AppModule {}
```

### Check a feature flag

```bash
import { Controller, Get, Query } from '@nestjs/common';
import { UnleashService } from 'nestjs-unleash-sdk';

@Controller()
export class AppController {
  constructor(private readonly unleashService: UnleashService) { }

  @Get()
  getHello(@Query('email') email: string): any {
    const options = { userId: email };
    const isEnabled = this.unleashService.client.isEnabled('feat', options);
    return isEnabled;
  }
}
```

## TODO

- Add feature flag decorators

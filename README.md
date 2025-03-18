# ![toggle_logo_text](https://github.com/user-attachments/assets/17e12440-f254-45d9-8e4e-090e52533f1a)

![Build & Publish](https://github.com/flagbear/flagbear-js/workflows/Build%20&%20Publish/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/flagbear/flagbear-js/branch/master/graph/badge.svg)](https://codecov.io/gh/flagbear/flagbear-js)
[![npm](https://img.shields.io/npm/dt/flagbear.svg)](https://github.com/flagbear/flagbear-js)
[![GitHub license](https://img.shields.io/github/license/flagbear/flagbear-js.svg)](https://github.com/flagbear/flagbear-js/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/flagbear/flagbear-js/graphs/commit-activity)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/kanekotic/)

## Motivation

Simple library to separate deployment of features from release time. It uses network accesible files without the need of a server to provide feature toggles.

## Installation

add it to your project using `npm install flagbear --save` or `yarn add flagbear`

## Usage

```js
import { flagbear } from '../lib'
// or: const { flagbear } = require("flagbear")

const url = "https://gist.githubusercontent.com/alvarolorentedev/c469f99bef5a5c0634b4a94a4acd6546/raw/toggles"
const refreshRateSeconds = 5
const defaultValues = [
    {
      type: "release",
      name: "prop",
      value: true,
    },
    {
      type: "release",
      name: "prop2",
      value: true
    },
    {
      type: "context",
      name: "prop3",
      conditions: [
        {
          field: "username",
          value: "user1",
          operation: "eq"
        }
      ]
    }
]

const subject = new flagbear(url, refreshRateSeconds, defaultValues)


setInterval(() => {
    if (subject.isEnabled("prop"))
        console.log("do stuff")
    else
        console.log("dont do stuff")
    if (subject.isEnabled("prop3", {"username": "user1"}))
        console.log("do stuff for user 1")
    else
        console.log("dont do stuff for user 1")
    if (subject.isEnabled("prop3", {"username": "user2"}))
        console.log("do stuff for user 2")
    else
        console.log("dont do stuff for user 2")
        
    console.log("-----------")
}, 10000);
```

## Type of toggles

### Release

Simple true/false logical path definition.
```js
{
    type: "release",
    name: "prop",
    value: true,
}
```

### Context

Allows complex logic to decide the outcome of the logical path (example traffic, users, resources available). 
```js
{
    type: "context",
    name: "prop3",
    conditions: [
        {
            field: "username",
            value: "user1",
            operation: "eq"
        }
    ]
}
```
available operations are:
* 'eq': equal (===)
* 'ne': not equal (!==)
* 'gt': greater than (>)
* 'ge': greater equal (>=)
* 'lt': lesser than (<)
* 'le': lesser qqual (<=)

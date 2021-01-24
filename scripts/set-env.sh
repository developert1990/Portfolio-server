#!/bin/bash

echo "JWT_SECRET=$JWT_SECRET" > .env
echo "MONGODB_URL=$MONGODB_URL" >> .env
echo "COOKIE_DOMAIN_PROD=$COOKIE_DOMAIN_PROD" >> .env
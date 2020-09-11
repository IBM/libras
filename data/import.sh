#!/bin/bash

# ASL
mongoimport --host mongo --db asl --collection signed --drop --type json --file signed.json --jsonArray
mongoimport --host mongo --db asl --collection spoken --drop --type json --file spoken.json --jsonArray
mongoimport --host mongo --db asl --collection translations --drop --type json --file translations.json --jsonArray

# LIBRAS
mongoimport --host mongo --db libras --collection signed --drop --type json --file signed.json --jsonArray
mongoimport --host mongo --db libras --collection spoken --drop --type json --file spoken.json --jsonArray
mongoimport --host mongo --db libras --collection translations --drop --type json --file translations.json --jsonArray

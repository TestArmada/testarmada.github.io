### Configure test profiles

There are two ways to configure test profiles
#### Via ***--profile*** command line argument

- **Magellan** can retrieve test profile information from an URL (to your hosted test profile). 

- The hosted test profile file needs to follow the format of:

```bash
{
  "profiles": {
    "microsoftedge": [{
      "browser": "MicrosoftEdge_16_Windows_10_Desktop",
      "resolution": "1280x1024",
      "executor": "sauce"
    }],
    "tier-one-browsers": [{
       "browser": "MicrosoftEdge_16_Windows_10_Desktop",
       "resolution": "1280x1024",
       "executor": "sauce"
      },
      {
       "browser": "chrome_latest_Windows_10_Desktop",
       "resolution": "1280x1024",
       "executor": "sauce"
      }
    ]
  }
}
```
- Magellan can read and resolve the hosted profile by the following command:
```bash
./node_modules/.bin/magellan --profile http://some.host#microsoftedge
```
- You can add as many test profiles as your need in the hosted file. Magellan is able to read more test profiles via:
```bash
./node_modules/.bin/magellan --profile http://some.host#microsoftedge,firefox57
```
- Or put multiple test profiles into one collection, such as **tier-one-browsers** in the above sample. To call it:
```bash
./node_modules/.bin/magellan --profile http://some.host#tier-one-browsers
```
#### Via *magellan.json* file
- **Magellan.json** file is using the same test profile format as the hosted test profile file. 
- To use it:
```bash
./node_modules/.bin/magellan --profile tier-one-browsers
```
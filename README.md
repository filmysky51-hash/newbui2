# Filmysky Firebase Security Rules

This document contains the recommended Firebase Realtime Database security rules for the Filmysky application. These rules are essential for securing your data and ensuring that users can only access and modify data they are permitted to.

To use these rules, copy the JSON content below and paste it into the "Rules" tab of your Firebase Realtime Database console.

## Database Rules (JSON)

```json
{
  "rules": {
    "filmysky": {
      ".read": "auth != null",
      ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true",

      "users": {
        "$uid": {
          ".read": "auth != null",
          ".write": "auth.uid === $uid || root.child('filmysky/users/' + auth.uid + '/role').val() === true",
          "viewCount": {
            ".write": "auth.uid === $uid && newData.val() === data.val() + 1"
          },
          "role": {
            ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
          },
          "subscription": {
            ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
          }
        }
      },

      "content": {
        ".read": "auth != null",
        ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
      },
      "liveTvNetworks": {
        ".read": "auth != null",
        ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
      },
      "upcoming": {
        ".read": "auth != null",
        ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
      },
      "subscriptionPlans": {
        ".read": "auth != null",
        ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
      },
      "appSettings": {
        ".read": "auth != null",
        ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
      },

      "comments": {
        "$contentId": {
          ".read": "auth != null",
          ".indexOn": "timestamp",
          "$commentId": {
            ".write": "root.child('filmysky/users/' + auth.uid + '/isAnonymous').val() === false && newData.child('userId').val() === auth.uid",
            ".validate": "newData.hasChildren(['userId', 'userName', 'text', 'timestamp'])"
          }
        }
      },

      "requests": {
        ".read": "root.child('filmysky/users/' + auth.uid + '/role').val() === true",
        "$requestId": {
          ".read": "root.child('filmysky/users/' + auth.uid + '/role').val() === true || data.child('userId').val() === auth.uid",
          ".write": "(root.child('filmysky/users/' + auth.uid + '/isAnonymous').val() === false && newData.child('userId').val() === auth.uid && !data.exists()) || root.child('filmysky/users/' + auth.uid + '/role').val() === true",
          ".validate": "newData.hasChildren(['userId', 'userName', 'title', 'type', 'status', 'requestedAt'])"
        }
      },

      "paymentRequests": {
        ".read": "root.child('filmysky/users/' + auth.uid + '/role').val() === true",
        "$requestId": {
          ".write": "(root.child('filmysky/users/' + auth.uid + '/isAnonymous').val() === false && newData.child('userId').val() === auth.uid && !data.exists()) || root.child('filmysky/users/' + auth.uid + '/role').val() === true"
        }
      },

      "contactMessages": {
        ".read": "root.child('filmysky/users/' + auth.uid + '/role').val() === true",
        "$messageId": {
          ".write": "newData.hasChildren(['name', 'email', 'message', 'submittedAt'])"
        }
      },

      "coupons": {
        ".read": "root.child('filmysky/users/' + auth.uid + '/role').val() === true",
        "$couponId": {
          ".read": "auth != null",
          ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true || (data.exists() && !data.child('usedBy').child(auth.uid).exists())",
          ".validate": "newData.hasChildren(['usageLimit', 'viewsToAdd', 'createdAt'])"
        }
      },
      
      "notificationsQueue": {
        ".read": "root.child('filmysky/users/' + auth.uid + '/role').val() === true",
        ".write": "root.child('filmysky/users/' + auth.uid + '/role').val() === true"
      }
    }
  }
}
```
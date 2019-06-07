const snApi = require('./lib/signnow')({
    credentials: 'ZmNkMzE4MzU3ZmUxNmQxMTM2NzVhZjNlZjE5ZjZmYzU6OTIxYWNlYzI2NjY1ZWRjMTc1ODljOWM5ODY5NzI4ZTc=',
	production: false, //(false uses eval server)
});

// 1. get access token (authentication)
snApi.oauth2.requestToken({
	username: 'tereshchenko.ruslan@pdffiller.team',
	password: '475509502',
}, (err, res) => {
    console.log(`
-------------------------------
1. snApi.oauth2.requestToken:
-------------------------------
    `);
    if (err) {
        console.error(err);
        console.log('\n');
    } else {
        console.log(res);
        console.log('\n');

        const { access_token: token } = res;
    
        // 2. verify access token
        snApi.oauth2.verify({
            token,
        }, (err2, res2) => {
            console.log(`
------------------------
2. snApi.oauth2.verify:
------------------------
            `);
            if (err2) {
                console.error(err2);
                console.log('\n');
            } else {
                console.log(res2);
                console.log('\n');
            }
        });

        // 3. get user data
        snApi.user.retrieve({
            token,
        }, (err3, res3) => {
            console.log(`
------------------------
3. snApi.user.retrieve:
------------------------
            `);
            if (err3) {
                console.error(err3);
                console.log('\n');
            } else {
                console.log(res3);
                console.log('\n');
            }
        });

        // 17. Get a list of folders
        snApi.folder.list({
            token
        }, (err17, res17) => {
            console.log(`
-----------------------
17. snApi.folder.list:
-----------------------
            `);
            if (err17) {
                console.error(err17);
                console.log('\n');
            } else {
                console.log(res17);
                console.log('\n');

                const { id } = res17.folders[6];

                // 18. Get a list of documents inside a folder
                id && snApi.folder.documents({
                    filter: [
                        {
                            'signing-status': 'signed',
                        },
                    ],
                    sort: {
                        'updated': 'desc',
                    },
                    id,
                    token,
                }, (err18, res18) => {
                    console.log(`
----------------------------
18. snApi.folder.documents:
----------------------------
                    `);
                    if (err18) {
                        console.error(err18);
                        console.log('\n');
                    } else {
                        console.log(res18);
                        console.log('\n');
                    }
                });

            }

        });

        // 4. get documnet list
        snApi.document.list({
            token,
        }, (err4, res4) => {
            console.log(`
------------------------
4. snApi.document.list:
------------------------
            `);
            if (err4) {
                console.error(err4);
                console.log('\n');
            } else {
                const docList = Array.isArray(res4) && res4.map(doc => doc.id)

                console.log(docList);
                console.log('\n');

                // 6. download document
//                 snApi.document.download({
//                     id: docList[0],
//                     token,
//                 }, (err6, res6) => {
//                     console.log(`
// ----------------------------
// 6. snApi.document.download:
// ----------------------------
//                     `);
//                     if (err6) {
//                         console.error(err6);
//                         console.log('\n');
//                     } else {
//                         console.log(res6);
//                         console.log('\n');
//                     }
//                 });


                // 13. Merges Existing Documents
                snApi.document.merge({
                    token,
                    name: "the merged doc",
                    document_ids: [
                        docList[2],
                        docList[3],
                    ]
                }, (err13, res13) => {
                    console.log(`
--------------------------
13. snApi.document.merge:
--------------------------
                    `);
                    if (err13) {
                        console.error(err13);
                        console.log('\n');
                    } else {
                        console.log(res13);
                        console.log('\n');
                    }

                    const { document_id: id } = res13;

                    // 14. Get Document History
                    id && snApi.document.history({
                        token,
                        id,
                    }, (err14, res14) => {
                        console.log(`
----------------------------
14. snApi.document.history:
----------------------------
                        `);
                        if (err14) {
                            console.error(err14);
                            console.log('\n');
                        } else {
                            console.log(res14);
                            console.log('\n');
                        }


                    });


                });

            }
        });


        // 7. upload document
        snApi.document.create({
            filepath: '/Users/ruslantereshchenko/Downloads/pdf-sample.pdf',
            token,
        }, (err7, res7) => {
            console.log(`
--------------------------
7. snApi.document.create:
--------------------------
            `);
            if (err7) {
                console.error(err7);
                console.log('\n');
            } else {
                console.log(res7);
                console.log('\n');

                const { id } = res7;

                // 10. Create Invite to Sign a Document (without fields)
                id && snApi.document.invite({
                    data: {
                        from: 'tereshchenko.ruslan@pdffiller.team',
                        to: 'russellswift11@yopmail.com',
                    },
                    id,
                    token,
                }, (err10, res10) => {
                    console.log(`
--------------------------------------------
10. snApi.document.invite (without fields):
--------------------------------------------
                    `);
                    if (err10) {
                        console.error(err10);
                        console.log('\n');
                    } else {
                        console.log(res10);
                        console.log('\n');
                    }

                    // 11. Cancel an Invite to a Document (without fields)
                    // snApi.document.cancelInvite({
                    //     id,
                    //     token,
                    // }, (err11, res11) => {
                    //     console.log(
                    //         '--------------------------------------------\n11. snApi.document.cancelInvite (without fields):\n--------------------------------------------\n',
                    //     );
                    //     if (err11) {
                    //         console.error(err11);
                    //         console.log('\n');
                    //     } else {
                    //         console.log(res11);
                    //         console.log('\n');
                    //     }
                    // });

                });
            }
        });



        // 7. upload document
        snApi.document.create({
            filepath: '/Users/ruslantereshchenko/Downloads/pdf-sample.pdf',
            token,
        }, (err7, res7) => {
            console.log(`
--------------------------
7. snApi.document.create:
--------------------------
            `);
            if (err7) {
                console.error(err7);
                console.log('\n');
            } else {
                console.log(res7);
                console.log('\n');

                const { id } = res7;

                const fields = {
                    "client_timestamp": 1527859375,
                    "fields": [
                      {
                        "page_number": 0,
                        "type": "signature",
                        "name": "FieldName",
                        "role": "Singer 1",
                        "required": true,
                        "height": 40,
                        "width": 50,
                        "x": 217,
                        "y": 32
                      },
                      {
                        "page_number": 0,
                        "type": "enumeration",
                        "name": "EnumerationName",
                        "role": "Singer 1",
                        "prefilled_text": 123,
                        "label": "EnumerationLabel",
                        "required": true,
                        "custom_defined_option": false,
                        "enumeration_options": [
                          123,
                          1234,
                          12345
                        ],
                        "height": 40,
                        "width": 50,
                        "x": 100,
                        "y": 32
                      },
                      {
                        "page_number": 0,
                        "type": "text",
                        "name": "TextName",
                        "role": "Singer 1",
                        "prefilled_text": 123,
                        "validator_id": "1f9486ae822d30ba3df2cb8e65303ebfb8c803e8",
                        "label": "TextLabel",
                        "required": true,
                        "height": 40,
                        "width": 50,
                        "x": 217,
                        "y": 120
                      },
                      {
                        "page_number": 0,
                        "type": "radiobutton",
                        "name": "RadiobuttonName",
                        "role": "Singer 1",
                        "prefilled_text": "RadioButtonValue2",
                        "label": "RadiobuttonLabel",
                        "required": true,
                        "radio": [
                          {
                            "value": "RadioButtonValue1",
                            "checked": "0",
                            "created": 1527859375,
                            "height": 30,
                            "width": 30,
                            "x": 551,
                            "y": 203,
                            "page_number": 0
                          },
                          {
                            "value": "RadioButtonValue2",
                            "checked": "0",
                            "created": 1527859375,
                            "height": 30,
                            "width": 30,
                            "x": 551,
                            "y": 241,
                            "page_number": 0
                          }
                        ],
                        "height": 34,
                        "width": 34,
                        "x": 228,
                        "y": 167
                      },
                      {
                        "page_number": 0,
                        "type": "checkbox",
                        "name": "CheckboxName",
                        "role": "Singer 1",
                        "prefilled_text": true,
                        "label": "checkboxLabel",
                        "required": true,
                        "height": 15,
                        "width": 11,
                        "x": 70,
                        "y": 270
                      },
                      {
                        "page_number": 0,
                        "type": "attachment",
                        "name": "AttachmentName",
                        "role": "Singer 1",
                        "label": "AttachmentLabel",
                        "required": true,
                        "height": 40,
                        "width": 35,
                        "x": 70,
                        "y": 350
                      },
                      {
                        "page_number": 0,
                        "type": "text",
                        "name": "CalculatedName",
                        "role": "Singer 1",
                        "formula": "TextName+EnumerationName",
                        "custom_defined_option": false,
                        "required": true,
                        "calculation_formula": {
                          "operator": "add",
                          "left": {
                            "term": "TextName"
                          },
                          "right": {
                            "term": "EnumerationName"
                          }
                        },
                        "calculation_precision": 2,
                        "height": 40,
                        "width": 50,
                        "x": 350,
                        "y": 55
                      },
                      {
                        "page_number": 0,
                        "type": "initials",
                        "name": "InitialsName",
                        "role": "Singer 1",
                        "label": "InitialsLabel",
                        "required": true,
                        "height": 52,
                        "width": 33,
                        "x": 300,
                        "y": 443
                      }
                    ]
                };
                
                //9. Update Document (add fields)
                id && snApi.document.update({
                    id,
                    fields,
                    token,
                }, (err9, res9) => {
                    console.log(`
--------------------------
9. snApi.document.update:
--------------------------
                    `);
                    if (err9) {
                        console.error(err9);
                        console.log('\n');
                    } else {
                        console.log(res9);
                        console.log('\n');

                        const { id } = res9;



                        // 5. get document data
                        id && snApi.document.view({
                            id,
                            token,
                        }, (err5, res5) => {
                            console.log(`
------------------------
5. snApi.document.view:
------------------------
                            `);
                            if (err5) {
                                console.error(err5);
                                console.log('\n');
                            } else {
                                console.log(res5);
                                console.log('\n');

                                const roleId = res5.roles[0].unique_id;

                                const fieldinvite = {
                                    "document_id": id,
                                    "to": [
                                      {
                                        "email": "russellswift11@yopmail.com",
                                        "role_id": roleId,
                                        "role": "Signer 1",
                                        "order": 1,
                                        "reassign": "0",
                                        "decline_by_signature": "0",
                                        "reminder": 0,
                                        "expiration_days": 30,
                                        "authentication_type": "password",
                                        "password": "123456",
                                        "subject": "Auth",
                                        "message": "AUTH message \"AUTH\""
                                      }
                                    ],
                                    "from": "tereshchenko.ruslan@pdffiller.team",
                                    "cc": [
                                      "russellswift3@yopmail.com",
                                      "russellswift4@yopmail.com"
                                    ],
                                    "cc_step": [
                                      {
                                        "name": "CC 1",
                                        "email": "russellswift3@yopmail.com",
                                        "step": 1
                                      }
                                    ],
                                    "subject": "test@signnow.com Needs Your Signature",
                                    "message": "test@signnow.com invited you to sign \"2 signers document\""
                                };
        
        
                                // 10. Create Invite to Sign a Document (with fields)
                                id && snApi.document.invite({
                                    data: {
                                        ...fieldinvite,
                                    },
                                    id,
                                    token,
                                }, (err10, res10) => {
                                    console.log(`
-----------------------------------------
10. snApi.document.invite (with fields):
-----------------------------------------
                                    `);
                                    if (err10) {
                                        console.error(err10);
                                        console.log('\n');
                                    } else {
                                        console.log(res10);
                                        console.log('\n');
                                    }
        
                                    // 11. Cancel an Invite to a Document (with fields)
                                    snApi.document.cancelInvite({
                                        id,
                                        token,
                                    }, (err11, res11) => {
                                        console.log(`
-----------------------------------------------
11. snApi.document.cancelInvite (with fields):
-----------------------------------------------
                                        `);
                                        if (err11) {
                                            console.error(err11);
                                            console.log('\n');
                                        } else {
                                            console.log(res11);
                                            console.log('\n');
                                        }


                                        // 12. Create a One-time Use Download URL
                                        snApi.document.share({
                                            token,
                                            id,
                                        }, (err12, res12) => {
                                            console.log(`
--------------------------
12. snApi.document.share:
--------------------------
                                            `);
                                            if (err12) {
                                                console.error(err12);
                                                console.log('\n');
                                            } else {
                                                console.log(res12);
                                                console.log('\n');
                                            }
                                        });

                                        // 15. Create a Template
                                        snApi.template.create({
                                            document_id: id,
                                            document_name: 'sdk template',
                                            token,
                                        }, (err15, res15) => {
                                            console.log(`
--------------------------
15. snApi.template.create:
--------------------------
                                            `);
                                            if (err15) {
                                                console.error(err15);
                                                console.log('\n');
                                            } else {
                                                console.log(res15);
                                                console.log('\n');

                                                const { id } = res15;

                                                // 16. Duplicate a Template
                                                snApi.template.duplicate({
                                                    name: 'sdk template duplicated',
                                                    id,
                                                    token,
                                                }, (err16, res16) => {
                                                    console.log(`
------------------------------
16. snApi.template.duplicate:
------------------------------
                                                    `);
                                                    if (err16) {
                                                        console.error(err16);
                                                        console.log('\n');
                                                    } else {
                                                        console.log(res16);
                                                        console.log('\n');

                                                        const { id } = res16;

                                                        // 19. create signing link
                                                        snApi.link.create({
                                                            document_id: id,
                                                            token,
                                                        }, (err19, res19) => {
                                                            console.log(`
-----------------------
19. snApi.link.create:
-----------------------
                                                            `);
                                                            if (err19) {
                                                                console.error(err19);
                                                                console.log('\n');
                                                            } else {
                                                                console.log(res19);
                                                                console.log('\n');
                                                            }
                                                        });
                                                        
                                                    }

                                                });


                                            }
                                        });


                                    });

        
                                });


                            }
                        });


                    }
                });

                
            }
        });


        // 8. Upload File & Extract Fields
        // snApi.document.fieldextract({
        //     filepath: '/Users/ruslantereshchenko/Downloads/pdf-sample.pdf',
        //     token,
        // }, (err8, res8) => {
        //     if (err8) {
        //         console.error(err8);
        //     } else {
        //         console.log(
        //             '--------------------------------------------\n8. snApi.document.fieldextract:\n--------------------------------------------\n',
        //             res8, '\n'
        //         );
        //     }
        // });

        

        

    
    }
});


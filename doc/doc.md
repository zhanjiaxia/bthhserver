# bt-site 接口文档
===========================================

## 搜索

> /async/search

### query

```json
{
    "content": "搜索内容",
    "from": 0,
    "size": 10,
    "sort": "-create_at"
}
```

### response

```json
{
    "results": [{
        "hash_info": "013f04e03da9d74571371aade394120919a0fdeb",
        "id" : "7849-dg-uiyoiy",
        "magnet" : "magnet:?xt=urn:btih:013f04e03da9d74571371aade394120919a0fdeb",
        "name" : "Kylie Minogue at iTunes Festival London 2014 HD 720p.mp4",
        "create_at" : 1458668166596
    },
    {}
    /* ... */
    ],
    "total": 44,
    "size": 10,
    "from": 0
}
```


use std::collections::HashMap;

use axum::{
    extract::Query,
    http::header::{self, HeaderMap},
    response::Json,
    routing::get,
    Router,
};
use serde_json::{json, Value};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(handler))
        .route("/json", get(json))
        .route("/cookies/set", get(cookies_set));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> &'static str {
    "Hello, World!"
}

async fn json() -> Json<Value> {
    Json(json!({"message": "Hello, World!"}))
}

async fn cookies_set(Query(params): Query<HashMap<String, String>>) -> (HeaderMap, Json<Value>) {
    // 获取 query 参数，并返回 set-cookie queryName=queryValue
    let mut headers = HeaderMap::new();
    headers.insert(header::CONTENT_TYPE, "application/json".parse().unwrap());

    for (key, value) in &params {
        headers.insert(
            header::SET_COOKIE,
            format!("{}={}", key, value).parse().unwrap(),
        );
    }

    (headers, Json(json!(params)))
}

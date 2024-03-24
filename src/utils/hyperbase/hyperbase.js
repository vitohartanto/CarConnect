export default class Hyperbase {
  #_baseUrl;
  #_baseWsUrl;
  #_projectId;
  #_tokenId;
  #_token;
  #_authToken;

  get baseUrl() {
    return this.#_baseUrl;
  }

  get baseWsUrl() {
    return this.#_baseWsUrl;
  }

  get projectId() {
    return this.#_projectId;
  }

  get authToken() {
    return this.#_authToken;
  }

  constructor(config) {
    this.#_baseUrl = config.base_url;
    this.#_baseWsUrl = config.base_ws_url;
    this.#_projectId = config.project_id;
    this.#_tokenId = config.token_id;
    this.#_token = config.token;
  }

  async setAuthToken(authToken) {
    const res = await this.#api("/auth/token", {
      method: "GET",
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    this.#_authToken = res.data.token;

    return this.#_authToken;
  }

  async signIn(collectionId, data) {
    const res = await this.#api(`/auth/token-based`, {
      method: "POST",
      body: JSON.stringify({
        token_id: this.#_tokenId,
        token: this.#_token,
        collection_id: collectionId,
        data,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    this.#_authToken = res.data.token;

    return this.#_authToken;
  }

  async getUserData() {
    const user = await this.#api(`/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.authToken}`,
      },
    });

    return user.data;
  }

  async setCollection(collectionId) {
    this.#api(`/project/${this.#_projectId}/collection/${collectionId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.#_authToken}`,
      },
    });

    return new HyperbaseCollection(this, collectionId);
  }

  async #api(input, init) {
    if (input.startsWith("/")) {
      input = input.slice(1);
    }
    const res = await fetch(`${this.#_baseUrl}/api/rest/${input}`, init);
    const resJson = await res.json();
    if (res.status.toString()[0] != "2") {
      throw resJson.error;
    }
    return resJson;
  }
}

class HyperbaseCollection {
  #_hyperbase;
  #_collectionId;
  #_socket;

  constructor(hyperbase, collectionId) {
    this.#_hyperbase = hyperbase;
    this.#_collectionId = collectionId;
  }

  async insertOne(object) {
    const res = await this.#api(`/record`, {
      method: "POST",
      body: JSON.stringify(object),
    });

    return res.data;
  }

  async findOne(_id) {
    const res = await this.#api(`/record/${_id}`, {
      method: "GET",
    });

    return res.data;
  }

  async updateOne(_id, object) {
    const res = await this.#api(`/record/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(object),
    });

    return res.data;
  }

  async deleteOne(_id) {
    await this.#api(`/record/${_id}`, {
      method: "DELETE",
    });
  }

  async findMany(data) {
    let fields, filters, groups, orders, limit;

    if (data) {
      ({ fields, filters, groups, orders, limit } = data);
    }

    const res = await this.#api(`/records`, {
      method: "POST",
      body: JSON.stringify({
        fields,
        filters,
        groups,
        orders,
        limit,
      }),
    });

    return res;
  }

  async subscribe(callbacks) {
    if (this.#_socket) {
      this.unsubscribe();
    }

    let onOpenCallback, onMessageCallback, onErrorCallback, onCloseCallback;

    if (callbacks) {
      ({ onOpenCallback, onMessageCallback, onErrorCallback, onCloseCallback } =
        callbacks);
    }

    this.#_socket = new WebSocket(
      `${this.#_hyperbase.baseWsUrl}/api/rest/project/${
        this.#_hyperbase.projectId
      }/collection/${this.#_collectionId}/subscribe?token=${
        this.#_hyperbase.authToken
      }`
    );

    if (onOpenCallback) {
      this.#_socket.addEventListener("open", onOpenCallback);
    }

    if (onMessageCallback) {
      this.#_socket.addEventListener("message", onMessageCallback);
    }

    if (onErrorCallback) {
      this.#_socket.addEventListener("error", onErrorCallback);
    }

    if (onCloseCallback) {
      this.#_socket.addEventListener("close", onCloseCallback);
    }
  }

  async unsubscribe(close) {
    let code, reason;

    if (close) {
      ({ code, reason } = close);
    }

    this.#_socket.close(code, reason);
    this.#_socket = undefined;
  }

  async #api(input, init) {
    if (input.startsWith("/")) {
      input = input.slice(1);
    }
    const res = await fetch(
      `${this.#_hyperbase.baseUrl}/api/rest/project/${
        this.#_hyperbase.projectId
      }/collection/${this.#_collectionId}/${input}`,
      {
        ...init,
        headers: {
          ...init.headers,
          "content-type": "application/json",
          authorization: `Bearer ${this.#_hyperbase.authToken}`,
        },
      }
    );
    const resJson = await res.json();
    if (res.status.toString()[0] != "2") {
      throw resJson.error;
    }
    return resJson;
  }
}

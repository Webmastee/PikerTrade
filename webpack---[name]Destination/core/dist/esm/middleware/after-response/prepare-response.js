const prepareResponse = async (_request, _options, response) => {
    const modifiedResponse = response;
    let content;
    if (_options.skipResponseCloning) {
        content = await response.text();
    } else {
        const clone = response.clone();
        content = await clone.text();
    }
    const agent = _options.agent;
    if (agent) {
        agent.destroy();
    }
    let data;
    try {
        if (modifiedResponse.headers.get('content-type') ? .includes('application/json')) {
            data = JSON.parse(content);
        } else {
            data = content;
        }
    } catch (_error) {}
    modifiedResponse.content = content;
    modifiedResponse.data = data;
    return modifiedResponse;
};
export default prepareResponse;
//# sourceMappingURL=prepare-response.js.map
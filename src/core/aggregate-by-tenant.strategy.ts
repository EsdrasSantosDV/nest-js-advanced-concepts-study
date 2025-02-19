import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';

export class AggregateByTenantContentIdStrategy implements ContextIdStrategy {
  //ISSO VAI CRIARR NOSSA ESTRATEGIA DE TENANT, ONDE VAMOS ARMAZENAR NOSSOS TENANTS
  //E SEPARAR POR CONTEXTO
  //NO CASO VMAOS COLOCAR NO HEADERS DA REQUEST
  private readonly tenants = new Map<string, ContextId>();
  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver {
    //MAS SE FOR DE OUTRO JEITO, PROXY, COMUNICAÇÃO TEMOS QUE TRATAR AQUI
    const tenantId = request.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return () => contextId;
    }

    let tenantTreeId: ContextId;
    if (this.tenants.has(tenantId)) {
      tenantTreeId = this.tenants.get(tenantId)!;
    } else {
      //SE NÃO TIVER DEVOLVEMOS UM NOVO CONTEXTO CRIADO E COLOCAMOS NO MAP
      tenantTreeId = ContextIdFactory.create();
      this.tenants.set(tenantId, tenantTreeId);
    }

    return {
      payload: { tenantTreeId },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantTreeId : contextId,
    };
  }
}

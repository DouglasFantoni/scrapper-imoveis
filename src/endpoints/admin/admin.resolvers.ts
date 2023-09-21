import { Query, Resolver } from "@nestjs/graphql";
import { AdminService } from "./admin.service";

// const pubSub = new PubSub();

@Resolver("Imoveis")
export class AdminResolvers {
	constructor(private readonly adminService: AdminService) {}

	@Query("removeAll")
	async removeAll(): Promise<void> {
		this.adminService.removeAll();
	}
}

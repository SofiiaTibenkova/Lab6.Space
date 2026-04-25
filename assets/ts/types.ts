export interface LaunchStatus {
    name: string;
}

export interface RocketConfiguration {
    name: string;
}

export interface Rocket {
    configuration: RocketConfiguration;
}

export interface LaunchServiceProvider {
    name: string;
}

export interface Launch {
    name: string;
    net: string;
    image: string | null;
    status: LaunchStatus | null;
    rocket: Rocket | null;
    launch_service_provider: LaunchServiceProvider | null;
}

export interface LaunchResponse {
    count: number;
    results: Launch[];
}
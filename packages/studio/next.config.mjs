/** @type {import('next').NextConfig} */

const nextConfig = {
  // basePath: '/viewtrack',
  // devIndicators: {
  //   buildActivityPosition: 'bottom-right',
  // },
  typescript: {
    // 타입스크립트 오류를 무시하고 빌드를 진행
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  env: {
    customKey: "my-value",
  },
  // httpAgentOptions: {
  //   keepAlive: false,
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
